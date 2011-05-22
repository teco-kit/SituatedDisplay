dojo.provide("cs.lib.string.init");

// add test module
cs.componentContainer.push({
	name : "cs.string.concat",
	description : "This module concatenates TEXT1 and TEXT2 to one FULL TEXT.",
	inputs : [
		{
			name: "TEXT1",
			type: cs.library.getType("cs.type.String")
		},
		{
			name: "TEXT2",
			type: cs.library.getType("cs.type.String")
		}],
	outputs:  [{
			name: "FULL TEXT",
			type: cs.library.getType("cs.type.String")
			}],
	image : "string/concat.png",
	exec: function(state){
		var text1 = state.inputs.item(0).getValue();
		var text2 = state.inputs.item(1).getValue();
		state.outputs.item(0).setValue(text1+text2);
	}
});


cs.componentContainer.push({
	name : "cs.string.match",
	description : "HAS SUBSTRING is true if SEARCH occures in TEXT",
	inputs : [
		{
			name: "TEXT",
			type: cs.library.getType("cs.type.String")
		},
		{
			name: "SEARCH",
			type: cs.library.getType("cs.type.String")
		}],
	outputs:  [{
			name: "HAS SUBSTRING",
			type: cs.library.getType("cs.type.Boolean")
			}],
	image : "string/match.png",
	exec: function(state){
		var text = state.inputs.item(0).getValue();
		var search = state.inputs.item(1).getValue();
		var result = (text.lastIndexOf(search)>-1);
		state.outputs.item(0).setValue(result);
	}
});

cs.componentContainer.push({
	name : "cs.string.replace",
	description : "NEW TEXT is TEXT in which all strings SEARCH have been replaced by REPLACE",
	inputs : [
		{
			name: "TEXT",
			type: cs.library.getType("cs.type.String")
		},
		{
			name: "SEARCH",
			type: cs.library.getType("cs.type.String")
		},
		{
			name: "REPLACE",
			type: cs.library.getType("cs.type.String")
		}],
	outputs:  [{
			name: "NEW TEXT",
			type: cs.library.getType("cs.type.String")
			}],
	image : "string/replace.png",
	exec: function(state){
		var text = state.inputs.item(0).getValue();
		var search = new RegExp(state.inputs.item(1).getValue(),"g");
		var replace = state.inputs.item(2).getValue();
		
		state.outputs.item(0).setValue(text.replace(search,replace));
	}
});



				
				// add test module
cs.componentContainer.push({
	name : "cs.string.repeat",
	description : "This module repeats the TEXT a FACTOR times.",
	inputs : 
		[
			{
				name: "TEXT",
				type: "cs.type.String"
			}
	
		],
	outputs:  [{
		name: "REPEATED STRING",
		type: cs.library.getType("cs.type.String")}
		],
	fields:[							{
				name: "FACTOR",
				type: "cs.type.Number"
			}],
	image:"string/repeat.png",
	
	exec : function(state){
		var text = state.inputs.item(0).getValue();
		var fac = Math.round(parseFloat(state.fields.item(0).getValue()));
		var out = "";
			var i = 0;
			for(i=0;i<fac;i++){
				out += text;
			}
			state.outputs.item(0).setValue(out);
		}
});