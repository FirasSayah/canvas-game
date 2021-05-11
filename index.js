const mycanvas = document.querySelector('#can')
const mycontext = mycanvas.getContext('2d')
mycanvas.width = innerWidth
mycanvas.height = innerHeight
const scoreId = document.querySelector('#score')
let score =0
const btn = document.querySelector('#btnstart')
const container = document.querySelector('#global')
const score2 = document.querySelector('#sco')


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
const player = new Player(x, y, 20, 'white') //creation un objet de class Player

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


class Army {
	constructor(x, y, radius, color, velocity){
		this.x = x
		this.y = y 
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	draw(){
		mycontext.beginPath()
		mycontext.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false)
		mycontext.fillStyle = this.color
		mycontext.fill()
	}
	update(){
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}

}
const demention = 0.99
class Soldger{
	constructor(x,y,radius,color,velocity){
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity // velocity c'est la rapidite
		this.alpha = 1
	}
	draw(){
		mycontext.save()
		mycontext.globalApha =this.alpha
		mycontext.beginPath()
		mycontext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		mycontext.fillStyle = this.color
		mycontext.fill()
		mycontext.restore()
	}
	update(){  // la methode update pour le dplacement de anemy
		this.velocity.x *= demention
		this.velocity.y *= demention
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
		this.alpha -= 0.01
	}
}

let anemys = [] // declaration d'une liste vide pour remplir avec les Anemy
let armys = []
let Soldgers =[]

function init(){
	 anemys = [] // declaration d'une liste vide pour remplir avec les Anemy
 	armys = []
 	Soldgers =[]
 	score = 0
 	score2.innerHTML = 0
 	scoreId.innerHTML = 0


}
window.addEventListener('click',(event)=>{
	const angle = Math.atan2(event.clientY - y, event.clientX - x)
	const velocity = {
		x : Math.cos(angle) * 6 ,	
		y : Math.sin(angle) * 6
	}

	anemys.push( new Anemy(x,y,8,'white',velocity))
})
function deplaceArmy(){
	setInterval(()=> {
		const x = 0 - Math.random() 
		const y = Math.random() * mycanvas.height 
		const radius = Math.random() * player.radius
		const codeColor = Math.floor(Math.random()*16777215).toString(16)
		const color = "#"+ codeColor	
		const angle = Math.atan2( mycanvas.height / 2 - y, mycanvas.width / 2 - x)
		const velocity = {
			x : Math.cos(angle),	
			y : Math.sin(angle)
	}

		armys.push(new Army(x, y, radius, color, velocity))},2000
		)
}

function Swap(){
	setInterval(()=>{
			const radius = Math.random() *(30 - 4) + 4
			let x
			let y
			if(Math.random() <0.5){
				x = Math.random() < 0.5 ? 0 - radius : mycanvas.width +radius
				y = Math.random() * mycanvas.height
			}
			else{
				x = Math.random() * mycanvas.width
				y = Math.random() < 0.5 ? 0 - radius : mycanvas.height +radius



			}

	})
}
let anmimationId
 function animate(){
 	anmimationId = requestAnimationFrame(animate)
 	mycontext.fillStyle ='rgba(0,0,0,0.1)'
 	mycontext.fillRect(0,0,mycanvas.width,mycanvas.height)
 	player.draw(); // appler la fonction draw pour la declancher 
 	Soldgers.forEach((soldger,index)=>{
 		soldger.draw()
 		soldger.update()
 		Soldgers.splice(index,1)
 	 		

 	})


 	anemys.forEach(anemy=>{
 		anemy.draw()
 		anemy.update()

 	})

 	 armys.forEach( (army,index) =>{
 	 	army.draw()
 	 	army.update()
 	 	anemys.forEach((anemy,anemyIndex)=>{
 	 		const distance = Math.hypot(anemy.x - army.x, anemy.y -army.y)
 	 		const dis = Math.hypot(army.x - player.x, army.y -player.y)
			if(dis -army.radius - player.radius <1){
				cancelAnimationFrame(anmimationId)
				container.style.display ='block'
				sco.innerHTML = score

			}

 	 		if(distance -army.radius - anemy.radius <1){
 	 			 	 	

 	 				for(let i =0; i< 8; i++){
 	 					Soldgers.push(new Soldger(anemy.x, anemy.y, 5, army.color, {x:1,y:1}))

 	 				}
 	 				if(army.radius -10 > 5){
 	 					gsap.to(army,{
 	 						radius: army.radius - 10
 	 					})
 	 					setTimeout(()=>{
 	 						anemys.splice(anemyIndex,1)

 	 					},0)
 	 					score += 100
 	 					scoreId.innerHTML  = score
 	 				}
 	 				else{
 	 					setTimeout(()=>{
						anemys.splice(anemyIndex,1)
 	 					armys.splice(index,1)
 	 					},0)
 	 					score += 45
 	 					scoreId.innerHTML  = score
 	 					

 	 				}


 	 		} 
 	 	}


 	 	 )
 	 })

 }
 btn.addEventListener('click',()=>{
 	init()

 	 deplaceArmy()
	animate()
	Swap()
	container.style.display ='none'
 })
