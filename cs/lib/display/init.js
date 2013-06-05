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
dojo.provide("cs.lib.display.init");
	
	var flot_options = {
		series: {
			lines: { show: true },
			points: { show: true }
		},
		grid: {
	      borderWidth: 1,
	      minBorderMargin: 10,
	      labelMargin: 10,
	      backgroundColor: {
	        colors: ["#fff", "#e4f4f4"]
	      },
	      hoverable: true,
	      mouseActiveRadius: 50,
	      margin: {
	        top: 8,
	        bottom: 20,
	        left: 20
	      }
	     },       
	    legend: {
	      show: true
	    }
	};
		
	cs.componentContainer.push({
				name: "cs.display.plot.flot",
				description: "Display data in a flot plot.",
				inputs: [{
					name: "x",
					type: "cs.type.Number"
				}, {
					name: "y",
					type: "cs.type.Number"
				}],
				outputs: [],
				fields:[{
				name: "MAXNUMBER",
				type: "cs.type.Number"
				}],
				image: "display/flot.png",
				blocks: [],
				initialized:false,
				data:[],
				exec : function(state){
					
					state.view.initDisplay();
					if(this.data==null)
					{
						this.data = [];
					}
					
					this.data.push([state.inputs.item(0).getValue(),state.inputs.item(1).getValue()]);
					while(this.data.length>parseFloat(state.fields.item(0).getValue()))
					{
						this.data.shift();
					}
					state.view.updateValue(this.data);
				},
				view : {					
					source : "<div style='min-width: 200px, min-height: 200px' />",
					
					initDisplay : function() {
						$(this.getNode()).width(200);
						$(this.getNode()).height(200);
						this.plot = $.plot($(this.getNode()), [], flot_options);						
					},

					updateValue : function(data){
					    this.plot.setData([data]);
					    this.plot.setupGrid();
						this.plot.draw();
					}
					
					
				}
			});
	
