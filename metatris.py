#from __future__ import print_function



import os
os.environ['PYGAME_HIDE_SUPPORT_PROMPT'] = "hide"
import math

import numpy as np
import random
import pygame
# import pandas as pd
 
from controllers import basic_evaluation_fn,best_action
from utils.tetris_engine_utils import *
from utils.constants import * 

class MetaTris:

    def __init__(self, width = 10 , height = 20,speed=1):
    
        self.width = int(width)
        self.height = int(height)
        self.board = np.zeros(shape=(width, height), dtype=np.float)
        self.speed = speed
        # actions are triggered by letters
        self.value_action_map = {
            0: left,
            1: right,
            2: hard_drop,
            3: soft_drop,
            4: rotate_left,
            5: rotate_right,
            6: idle,
        }
        self.action_value_map = dict([(j, i) for i, j in self.value_action_map.items()])
        self.nb_actions = len(self.value_action_map)
        
        
        
        self.group_actions_number=4*self.width # Means that there are 4 possible rotations and width-number of translations +1 for idle translations
        
        # for running the engine
        self.time = -1
        self.score = -1
        self.anchor = None
        self.shape = None
        
        self.cleared_lines=0
        self.cleared_lines_per_move=0
        # used for generating shapes
        self._shape_counts = [0] * len(shapes)
        
        self.piece_number=None
        self.tetrominos=0
        # clear after initializing
        self.clear()
    
    
    
    def _choose_shape(self):
        maxm = max(self._shape_counts)
        m = [5 + maxm - x for x in self._shape_counts]
        r = random.randint(1, sum(m))
        for i, n in enumerate(m):
            r -= n
            if r <= 0:
                self._shape_counts[i] += 1
                self.piece_number=i
                return shapes[shape_names[i]]


    def _new_piece(self):
        # Place randomly on x-axis with 2 tiles padding
        #x = int((self.width/2+1) * np.random.rand(1,1)[0,0]) + 2
        self.tetrominos+=1
        self.anchor = (self.width //2, 0)
        #self.anchor = (x, 0)
        self.shape = self._choose_shape()
        self.shape, self.anchor = soft_drop(self.shape, self.anchor, self.board)

        
    # Modification
    
    
    def _has_dropped(self):
        is_occ=is_occupied(self.shape, (self.anchor[0], self.anchor[1] + 1), self.board)
        return is_occ
    
    
    #Modification
    def _clear_lines(self):
        can_clear = [np.all(self.board[:, i]) for i in range(self.height)]
        new_board = np.zeros_like(self.board)
        j = self.height - 1
        for i in range(self.height - 1, -1, -1):
            if not can_clear[i]:
                new_board[:, j] = self.board[:, i]
                j -= 1
        self.score += sum(can_clear)
        self.board = new_board
        self.cleared_lines_per_move=sum(can_clear)
        self.cleared_lines += sum(can_clear)


    #Modification
    
    
    def _exec_normal_action(self,action):
        self.anchor = (int(self.anchor[0]), int(self.anchor[1]))
        self.shape, self.anchor = self.value_action_map[action](self.shape, self.anchor, self.board)
        self.shape, self.anchor = soft_drop(self.shape, self.anchor, self.board)


    def step(self):
        
        #Basic Actions for normal actions but the groud are up tp 40 actions
        #0: left,
        #1: right,
        #2: hard_drop,
        #3: soft_drop,
        #4: rotate_left,
        #5: rotate_right,
        #6: idle,
        done = False     

        for ev in pygame.event.get():

            if ev.type == pygame.QUIT or (ev.type == pygame.KEYDOWN and ev.unicode == 'q'):
                done = True
            # Detect the key evevents for game control.
            if ev.type == pygame.KEYDOWN:
                if ev.key == pygame.K_DOWN:
                    self._exec_normal_action(3)
                if ev.key == pygame.K_LEFT:
                    self._exec_normal_action(0)
                if ev.key == pygame.K_RIGHT:
                    self._exec_normal_action(1)
                if ev.key == pygame.K_SPACE:
                    self._exec_normal_action(4)
                print(self)
                # if ev.key == pygame.K_p:
                #     self.pause()
            if ev.type == TIMER_MOVE_EVENT:
                print(self)
                self._exec_normal_action(3)

        # Update time 
        self.time += 1


        done = False
        if self._has_dropped():
            
            self._set_piece(True)
            self._clear_lines()
            if np.any(self.board[:, 0]):
                done = True
            else:
                self._new_piece()
            self._set_piece(False)

                
        
        return self.cleared_lines_per_move, done

    def set_move_timer(self):
        """
        Setup the move timer to the 
        """
        # Setup the time to fire the move event. Minimal allowed value is 1
        speed = math.floor(MOVE_TICK / self.speed)
        speed = max(1,speed)
        pygame.time.set_timer(TIMER_MOVE_EVENT,speed)

    def run (self) :
        pygame.init()
        self.set_move_timer()


        done =False 
        while not done:
            _, done = self.step()


    def clear(self):
        self.time = 0
        self.score = 0
        self._new_piece()
        self.board = np.zeros_like(self.board)
        self.cleared_lines=0
        self.cleared_lines_per_move=0
        self.tetrominos=0

    def _set_piece(self, on=False):
        for i, j in self.shape:
            x, y = i + self.anchor[0], j + self.anchor[1]
            if x < self.width and x >= 0 and y < self.height and y >= 0:
                self.board[int(self.anchor[0] + i), int(self.anchor[1] + j)] = on

    def __repr__(self):
        self._set_piece(True)
        s = 'o' + '-' * self.width + 'o\n'
        s += '\n'.join(['|' + ''.join(['X' if j else ' ' for j in i]) + '|' for i in self.board.T])
        s += '\no' + '-' * self.width + 'o'
        self._set_piece(False)
        return s
    
    
    # ADDED Functions
    #Modification   
    
   

        #0: left,
        #1: right,
        #2: hard_drop,
        #3: soft_drop,
        #4: rotate_left,
        #5: rotate_right,
        #6: idle,  
if __name__=="__main__":

    
    engine = MetaTris(10,20)
    engine.run()





