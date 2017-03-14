(function  () {
	var Game=window.Game=function(ctx){
       this.state=0;
       this.ctx=ctx;
       this.life=100;
       this.age=0;
       this.die=0;
       this.lifen=0;
       this.score=0;
       this.timer=null;
       this.mouse_arr=[this.oget("img_dishu"),this.oget("img_dishu_2"),this.oget("img_tuzi")];
       this.anitype=this.random1(29/10);
       this.animal=this.mouse_arr[this.anitype];
       this.position=[{x:90,y:105-60},{x:10,y:165-60},{x:90,y:165-60},{x:170,y:165-60},{x:90,y:232-60}];
       this.ponum=this.random1(49/10);
       this.kickpo=0;
       this.bornpo=this.position[this.ponum];
       this.anisize= this.anitype==2 ? 74 : 60;      
       this.lock=true;
       this.init();
    }
    Game.prototype.oget=function(id){
      var oGet= document.getElementById(id);
	      return oGet;

    }
   Game.prototype.init=function(){
	     this.renderbj();
	     this.ctx.drawImage(this.oget("img_logo"),0,0); 
       this.begin(); 
      

	}


	 Game.prototype.renderbj=function(){
       this.ctx.drawImage(this.oget("bj"),0,0);

    }

   Game.prototype.begin=function(){
      this.lifen=2;
      var me=this;
     
       document.onkeydown=function(e){
      
      
         if(e.keyCode==13 && me.lock==true){

          me.lock=false;
          me.timer=setInterval(function(){

              me.age++;
          if(me.die!=1){
            if(me.age<10){
              me.state=0; 
            }else if(me.age<30){
              me.state=1;
             
            }else if(me.age<me.life){
              me.state = (me.age%5)>2? 3:2;        

            }else if(me.age>=me.life){
                if(me.anitype!=2){
                  me.lifen--;
                }
                me.reset1();
             
            }
             me.renderbj();
             me.drawheart();
             me.ctx.drawImage(me.animal,me.state*me.anisize,0,me.anisize,58,me.bornpo.x,me.bornpo.y,60,58);
             if(me.die==-1){
              me.drawhammer();
             }
          }else if(me.die==1){
          
             me.renderbj();
             me.drawheart();
             me.ctx.drawImage(me.animal,me.state*me.anisize,0,me.anisize,58,me.bornpo.x,me.bornpo.y,60,58);
             me.age>=80 && (me.life-me.age)>10 ? me.drawhammer(): me.drawstar();
            if(me.age>=me.life){
                me.reset1();

            }
           }  
            me.gameover(); 
           }, 30)
         }

          if (e.keyCode==37) {
             me.kickpo=1;
             me.check();
          }else if(e.keyCode==38){
             me.kickpo=0;
             me.check();
          }else if(e.keyCode==39){
             me.kickpo=3;
             me.check();
          }else if(e.keyCode==40){
             me.kickpo=4;
             me.check();
          }else if(e.keyCode==32){
             me.kickpo=2;
             me.check();
          }
          

       }     	
     }
   Game.prototype.reset1=function(){
       this.die=0;
       this.age=0;
       this.state=0;     
       this.anitype=this.random1(29/10);
       this.animal=this.mouse_arr[this.anitype];
       this.ponum=this.random1(49/10);
       this.bornpo=this.position[this.ponum];
       this.anisize= this.anitype==2 ? 74 : 60;
 
   }
   Game.prototype.random1=function(n){
      var num=parseInt(Math.random()*n);
      return num;

    }
   Game.prototype.check=function(){
    
     if(this.kickpo==this.ponum){
        console.log("打中")
        this.state=4;
        this.age=80;
        this.die=1;

        if(this.anitype==2){        
          this.lifen--;
        }else if(this.anitype==1){
          this.score+=2;
        }else if(this.anitype==0){
          this.score+=1;
        }
     }else{ 
        this.die=-1;
      console.log("没打中");

     }

   }

  
   Game.prototype.drawhammer=function(){

       this.ctx.drawImage(this.oget("img_chuizi"),0,0,87,60,this.position[this.kickpo].x,this.position[this.kickpo].y,87,60);
   }
   Game.prototype.drawstar=function () {
      this.ctx.drawImage(this.oget("img_chuizi"),87,0,87,60,this.position[this.kickpo].x,this.position[this.kickpo].y,87,60);
   }
   Game.prototype.drawheart=function(){
      this.ctx.drawImage(this.oget("img_life"),10,5);
      this.ctx.drawImage(this.oget("img_life1"),35,5);
      this.drawnum1();
      this.drawnum2();
   }
   Game.prototype.drawnum1=function(){
     for (var i = 0; i < this.lifen.toString().length; i++) {
      this.ctx.drawImage(this.oget("img_num_1"),12* this.lifen.toString().charAt(i),0,12,15,55+i*15,5,12,15);
        
     };    
   }

   Game.prototype.drawnum2=function(){

     for (var i = 0; i < this.score.toString().length; i++) {
      this.ctx.drawImage(this.oget("img_num_1"),12* this.score.toString().charAt(this.score.toString().length-i-1),0,12,15,240-i*15-20,300,12,15); 
      };
     }

   Game.prototype.gameover=function(){
    var me=this;
    if(this.lifen==0){
      this.lock=true;
       clearInterval(this.timer);   
       this.yesno=true;
       this.onemoreyes();


     document.onkeydown=function(e){
        

      if(e.keyCode==13 && me.yesno==true){
        me.begin();
      }else if(e.keyCode==13 && me.yesno==false){
        me.init();
      }else{
            if(me.yesno==true){
            me.onemoreno();
             }else{
            me.onemoreyes();
             }
         }     
      }      
    }
   }


   Game.prototype.onemoreyes=function(){
      this.ctx.drawImage(this.oget("img_cw"),(240-87)/2,100);     
      this.ctx.drawImage(this.oget("img_cwk"),(240-87)/2+15,168);
      this.yesno=true;
      
      
   }

   Game.prototype.onemoreno=function(){
      this.yesno=false;
      this.ctx.drawImage(this.oget("img_cw"),(240-87)/2,100);     
      this.ctx.drawImage(this.oget("img_cwk"),(240-87)/2+50,168);
   }

})()