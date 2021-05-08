const mycanvas = document.querySelector('#can')
const mycontext = mycanvas.getContext('2d')
mycanvas.width = innerWidth
mycanvas.height = innerHeight


//creer un class player pour manipuler le nombre de player dans le jeu
class Player{
	constructor(x,y,radius,color){ //creer un constructeur pour la class player
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}
	//draw c'est une fonction qui sera declancher le class player lors de exucusion 
	draw(){
		mycontext.beginPath() //beginpath c'est fonction pre defini sur java script pour start chemin
		mycontext.arc(this.x, this.y ,this.radius, 0, Math.PI * 2, // on utilise la fonction arc pour designer un chemin cerculaire sur l'ecrant et pour un chemin rectantguaire on utiluse la fonction rect !!			
		false)
		mycontext.fillStyle= this.color //la fonction fillStyle pour remplir la coleur qui vous avez choisir
		mycontext.fill() //fill pour la declancher 
		// remarque la fonction fillStyle sera codez avant la fonction fill

	}
}
var  x = mycanvas.width  / 2,
	y = mycanvas.height  / 2 
const player = new Player(x, y, 100, 'blue') //creation un objet de class Player

class Anemy{
	constructor(x,y,radius,color,velocity){
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity // velocity c'est la rapidite
	}
	draw(){
		mycontext.beginPath()
		mycontext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		mycontext.fillStyle = this.color
		mycontext.fill()
	}
	update(){  // la methode update pour le dplacement de anemy
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}
const anemys = [] // declaration d'une liste vide pour remplir avec les Anemy
window.addEventListener('click',(event)=>{
	const angle = Math.atan2(event.clientY - y, event.clientX - x)
	const velocity = {
		x : Math.cos(angle),	
		y : Math.sin(angle)
	}

	anemys.push( new Anemy(x,y,5,'green',velocity))
})
 function animate(){
 	mycontext.clearRect(0,0,x * 2,y * 2)
 	requestAnimationFrame(animate)
 	player.draw(); // appler la fonction draw pour la declancher 

 	anemys.forEach(anemy=>{
 		anemy.draw()
 		anemy.update()
 	})
 }
animate()