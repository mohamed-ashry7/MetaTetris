# MetaTris


## Running

The application is divided into two parts:
* metatris-backend
* metatris-frontend 

Both the two servers are containerized using docker to make the application easy to run and install.
### Steps
1) Download docker software to your machine.
2) Run the command in the root of the directory.
```bash
docker-compose up
```
3) Open the browser and then go to [http://localhost:3000/](http://localhost:3000/)

### To play the game:

#### Controllers:

| Action         | Key          | 
| ------------- | ------------- | 
| Move Left      | Left Arrow | 
| Move Right      | Right Arrow      |
| Move Down (Soft Drop) | Down Arrow      |
| Hard Drop      | S-Key | 
| Rotate Left      | A-Key      |
| Rotate Right | D-Key   |

#### Snapshot of the game:

![Screenshot of the game](https://i.ibb.co/8jz51rJ/Screenshot-from-2022-04-03-23-17-38.png)

## Development phase:
* The backend server is running on the [http://localhost:4000/](http://localhost:4000/)
* The frontend server is running on the [http://localhost:3000/](http://localhost:3000/)

