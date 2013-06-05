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
dojo.provide("cs.lib.util.init");
		
	cs.componentContainer.push({
				name: "cs.util.counter",
				description: "Runcounter",
				inputs: [],
				outputs: [ { name: "count",
				 type: "cs.type.Number"}],
				fields:[{
				name: "INITIAL",
				type: "cs.type.Number"
				},
				{
				name: "STEP",
				type: "cs.type.Number"
			}
			],
				image: "util/counter.png",
				blocks: [],
				exec : function(state){
					
					if(this.counter==null)
					{
						this.counter = parseFloat(state.fields.item(1).getValue());
					} else {
						this.counter = this.counter + parseFloat(state.fields.item(0).getValue());						
					}
					state.outputs.item(0).setValue(this.counter);
					
				}
			});
	
