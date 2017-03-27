## Ember-Cli POC

This project implements the procedures frontend using ember with the ember-cli help


## Prerequisites

### Node
Verify version >= 0.12
> node --version  

If not, follow [node install guides under installation](http://guides.emberjs.com/v2.1.0/getting-started/)
- Ubuntu
> curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -  
> sudo apt-get install -y nodejs


### Ember-cli

> sudo npm install -g ember-cli  
> ember -v

### Watchman
(Detects file changes)
> sudo apt-get install python-dev
> git clone https://github.com/facebook/watchman.git  
> cd watchman  
> git checkout v3.9.0
> ./autogen.sh  
> ./configure  
> make  
> sudo make install  
> cd ..
> sudo rm -fR watchman
 
 
### PhantomJs
 (fake browser)
 
> sudo npm install -g phantomjs-prebuilt


## Setup

> cd mementia-frontend  
> npm install  
> bower install  
> ember server --proxy http://127.0.0.1:9090  
(Debería levantar pagina [http://localhost:4200](http://localhost:4200) y forwardear los requests al backend en localhost:9090)




## Compilar a produccion
> ember build --environment=production  
> cd ..  
> mvn install


## Project structure
It follows the guidelines [from ember-cli](http://www.ember-cli.com/user-guide/#naming-conventions)
in terms of names a and structures

## Commands to create this project 

> ember new mementia-frontend --skip-gitapp
> cd new mementia-frontend
> bower install bootstrap --save  

Add to `ember-cli-build.js`
```
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
```

### Update ember-cli 2.8.0 
Tomado de: https://github.com/ember-cli/ember-cli/releases 
> cd mementia-frontend  
- Desintale node, npm, bower y borre dir de libs porque bower seguia en version vieja
- Instale node y bower segun instrucciones, para arreglar el problema de EACCESS use:  
> sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}  

Arrancando de nuevo:  
> npm install -g ember-cli  
> rm -rf node_modules bower_components dist tmp  
> npm cache clean  
> bower cache clean  
> npm install --save-dev ember-cli@2.8.0  
> npm install  
> bower install  
> ember init  

Revisar cambios contra git, mergeando cada diff
> npm install
> bower install

## Reference Stuff
Ember Object: http://ember.vicramon.com/the-ember-object