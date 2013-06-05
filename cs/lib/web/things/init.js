/**
 * ClickScript - ClickScript is a visual programming language. This is a 
 * data flow programming language running entirely in a web browser.
 * Copyright (C) 2012 Lukas Naef
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * @author lnaef
 */

dojo.provide("cs.lib.web.things.init");



	
	/**
	 * Open a page in an iframe
	 */
	cs.componentContainer.push({
		name : "cs.web.things.switch",
		description : "switch on or off",
		inputs : 
			[
				{
					name: "IP",
					type: "cs.type.String"
				},
				{
					name: "on/off",
					type: "cs.type.Boolean"
				}
			],
		outputs:  
			[
				
			],
		image: "web/things/plogg.png",
		exec : function(state){
			this.setAsync();
			
			var ip = state.inputs.item(0).getValue();
			var aurl = "http://"+ip+":8082/EnergyMonitor/ploggs/Laptop/status.html";
			var onoff = state.inputs.item(1).getValue() ? "on" : "off";
			var component = this;
			
			//console.log ("IP:" + ip +" URL:"+ aurl +" STATE:"+ onoff);
			
			$.ajax({
				  url: aurl,
				  type: "POST",
				  data: ({status : onoff}),
				  success: function(html){
					//console.log("successful ajax call for switch");
				    alert("status of fan : " +onoff);
				    component.finishAsync();  
				  },
				  error: function(msg){
					alert("Error on: "+aurl);  
				  }
				});
		}
	});

	
	/**
	 * Open a page in an iframe
	 */
	cs.componentContainer.push({
		name : "cs.web.things.temperature",
		description : "get the temperature",
		inputs : 
			[
				{
					name: "ip",
					type: "cs.type.String"
				}	
			],
		outputs:  
			[
				{
					name: "temperature",
					type: "cs.type.Number"
				}			
			],
		image: "web/things/temp.png",
		exec : function(state){
			this.setAsync();
			var ip = state.inputs.item(0).getValue();
			var component = this;
			
			$.getJSON(
				  "http://"+ip+":8080/AmbientMeter/sensors/temperature/",
				  function(json){
					var temp = json[0].resource.values.main[0];
					//console.log(temp);
					alert(temp);
					state.outputs.item(0).setValue(temp);
				    component.finishAsync();	    
				  }
				);
		}
	});


        /**
         * Open a page in an iframe
         */
        csComponentContainer.push({
                name : "cs.web.things.plugwise",
                        description : "switch on or off and get current power consumption",
                inputs :
                        [
                                {
                                        name: "URL",
                                        type: "cs.type.String"
                                },
                                {
                                        name: "on/off",
                                        type: "cs.type.Boolean"
                                }
                        ],
                outputs:  
                        [
                                {
                                        name: "Power",
                                        type: "cs.type.Number"
                                }
                               
                        ],
                image: "web/things/plugwise.png",
                exec : function(state){
                        this.setAsync();
                       
                        var id = state.inputs.item(0).getValue();
                        var aurl = "http://cumulus.teco.edu:51525/actuator/entity/"+id+"/function/" + (state.inputs.item(1).getValue() ? "on" : "off");
                        var surl = "http://cumulus.teco.edu:51525/sensor/entity/"+id+"/data";
                        var component = this;
                       
                        //console.log ("IP:" + ip +" URL:"+ aurl +" STATE:"+ onoff);
                       
                        $.ajax({
                                  url: aurl,
                                  type: "PUT",
                                  data: ({}),
                                  success: function(html){
                                        //console.log("successful ajax call for switch");
                                           // alert("status of fan : " +onoff);
                                    //component.finishAsync();  
                                    $.getJSON(
                                            surl,
                                            function(json){
                                            var temp = Number(json.energy.value);
                                            //console.log(temp);
                                            //alert(temp);
                                            state.outputs.item(0).setValue(temp);
                                            component.finishAsync();       
                                            }
                                            );
                                    },
                                        error: function(msg){
                                        alert("Error on: "+aurl);  
       }

                        });
                }
        });


	/**
	 * Open a page in an iframe
	 */
	csComponentContainer.push({
		name : "cs.web.things.upart",
		description : "uPart Sensor Node",
		inputs :
			[
				{
					name: "id",
					type: "cs.type.String"
				}      
			],
		outputs:  
			[
				{
					name: "light",
					type: "cs.type.Number"
				},
				{
					name: "move",
					type: "cs.type.Number"
				},
				{
					name: "temperature",
					type: "cs.type.Number"
				}
			],
		image: "web/things/upart.png",
		exec : function(state){
		this.setAsync();
		var component = this;
			var id = state.inputs.item(0).getValue();
			var surl = "http://cumulus.teco.edu:51525/sensor/entity/"+id+"/data";
				       
		$.getJSON(
				surl,  
				function(data){
				console.log(data);
				state.outputs.item(0).setValue(Number(data.light.value));
				state.outputs.item(1).setValue(Number(data.move.value));
				state.outputs.item(2).setValue(Number(data.temperature.value));
				component.finishAsync();           
				}
			 );
		}
	});

        /**
         * LIGHTSTRIP INTEGRATION
         * Open a page in an iframe
         */
        csComponentContainer.push({
                name : "cs.web.things.ledstrip",
                        description : "configure color values of ledstrip",
                inputs :
                        [
                                {
                                        name: "URL",
                                        type: "cs.type.String"
                                },
                                {
                                        name: "Amount of Red",
                                        type: "cs.type.Number"
                                },
                                {
                                        name: "Amount of Green",
                                        type: "cs.type.Number"
                                },
                                {
                                        name: "Amount of Blue",
                                        type: "cs.type.Number"
                                }
                        ],
/*                outputs:  
                        [
                                {
                                        name: "Power",
                                        type: "cs.type.Number"
                                }
                               
                        ],*/
                image: "web/things/ledstrip.png",
                exec : function(state){
                       
                        var id = state.inputs.item(0).getValue();
                        var aurl = "http://cumulus.teco.edu:51525/actuator/entity/"+id+"/function/set";
                        var component = this;
                        var ri= state.inputs.item(1).getValue();
                        var gi= state.inputs.item(2).getValue();
                        var bi= state.inputs.item(3).getValue();
                       
                        //console.log ("IP:" + ip +" URL:"+ aurl +" STATE:"+ onoff);
                        $.ajax({
                              url: aurl,
                              type: "PUT",
                              data: {r : ri, g : gi, b : bi },
                              success: function(html){return 1;}
                            });

                }
        });

	/**
	 * Open a page in an iframe
	 */
        csComponentContainer.push({
                name: "cs.web.things.discover",
                description: "RESULT is collection of all incomming ELEMENTSs (at the moment only type numbers)",
                outputs: [{
                        name: "RESULT",
                        type: "Collection<cs.type.String>"
                }],
                fields: [
                {
                        name: "type",
                        type: "cs.type.String"
                },
                {
                        name: "tags",
                        type: "cs.type.String"
                }
                ],
                image: "web/things/discover.png",
                exec : function(state){
                        this.setAsync();
                        var type = state.fields.item(1).getValue();
                        var tags = state.fields.item(0).getValue();
                        var component = this;
                        var surl = "http://cumulus.teco.edu:51525/sensor/class/"+type+(tags!=""?"?tags="+tags:"");
                        //alert(surl);

                        $.getJSON(
                                        surl,  
                                        function(data){
                                        var collection = new cs.util.Container();
                                        state.outputs.item(0).setValue(collection);
                                        for( var entity in data )
                                        {
                                        collection.add(entity);
                                        }
                                        component.finishAsync();           
                                        }
                                 );
                }
        });
	
