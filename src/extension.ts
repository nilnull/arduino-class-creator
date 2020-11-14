// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';


function create_name_input()
{
	var option: vscode.InputBoxOptions = {
		ignoreFocusOut: false,
		placeHolder: "name of your class.",
		prompt: "Type your class name"
	};
	return vscode.window.showInputBox(option);
}

async function create_path_input()
{
	var option: vscode.InputBoxOptions = {
		ignoreFocusOut: false,
		placeHolder: "The path that your files will be created",
		prompt: "Type a valid path"
	};
	return await vscode.window.showInputBox(option);
}

function create_header_file(name: string, dir: string)
{
	var header_buffer =
	`
#ifndef ARDUINO_`+name.toUpperCase() +`_H
#define ARDUINO_`+name.toUpperCase() +`_H
#include <Arduino.h>

class ` + name +`  
{
	private:

	public:

		`+ name +`();
		~`+name+`();

};
#endif
`;
	var header_name = dir+"/"+name + '.h';
	fs.writeFile(header_name, header_buffer, function (err)
	{
		if (err) {
			console.error(err);
			return false;
		}
	});


	return true;
}

function create_arduino(name: string, dir: string)
{
	var arduino_buffer =
`#include "` + name +`.h"  

`+name+`::`+ name +`()
{

}

`+name+`::~`+ name + `()
{

}`;
	var arduino_name = dir+"/"+name + '.cpp';
	fs.writeFile(arduino_name, arduino_buffer, function (err)
	{
		if (err) {
			console.error(err);
			return false;
		}
	});

	return true;
}

function add_to_task(name: string, dir: string)
{
	var real_dir = dir + "/.vscode/tasks.json";
	if (!fs.existsSync(real_dir)) { return; }


	var json_inp = fs.readFileSync(real_dir, 'utf-8');

	var jsonA = JSON.parse(json_inp);


	var tasks = jsonA["tasks"];


	for (var i = 0; i < tasks.length; i++)
	{
		if (jsonA["tasks"][i]["label"] = "g++ build active sfmlfile")
		{
			jsonA["tasks"][i]["args"].push("${fileDirname}/" + name + "/" + name + ".cpp");
		}
	}
	jsonA = JSON.stringify(jsonA, null, 1);

	fs.writeFileSync(real_dir, jsonA);
	
}

function create_class(name: string, dir: string)
{
	if (fs.existsSync(dir)) {
		var stats = fs.lstatSync(dir);

		if (!stats.isDirectory()) {
			return false;
		}
	}
	else
		fs.mkdirSync(dir);

	var header = create_header_file(name, dir);
	var arduino = create_arduino(name, dir);

	return (header && arduino);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "arduino-class-creator" is now active!');

	let disposable = vscode.commands.registerCommand('extension.createClass', () => {
		// The code you place here will be executed every time your command is executed

		var input = create_name_input().then(async function (res)
		{
			if (!res)
			{
				vscode.window.showErrorMessage("Your Class could not be created!");
				return;
			}
			else if (res.length > 60)
			{
				vscode.window.showErrorMessage("Class name to long!");
				return;
			}
			else if (res.indexOf(' ') >= 0)
			{
				vscode.window.showErrorMessage("Class name should not have spaces!");
				return;
			}
			let dir :string | undefined | boolean= vscode.workspace.getConfiguration().get("arduino.creator.setPath");
			if (dir == false)
				dir = null as any;
			if (dir == null) {
				dir = vscode.workspace.rootPath as string;
				let createFolder: boolean | undefined = vscode.workspace.getConfiguration().get("arduino.creator.createFolder");
				if (createFolder)
					dir += "/" + res;
			}
			else if (dir == true)
			{
				dir = await create_path_input();
				if (!dir)
				{
					dir = vscode.workspace.rootPath as string;
				}
			}
			var out = create_class(res, dir as string);
			if (out)
			{
				if (vscode.workspace.getConfiguration("arduino.sfml.addClassToTask"))
				{
					var test: string = vscode.workspace.rootPath+"";
					add_to_task(res, test);
				}
					vscode.window.showInformationMessage('Your Class ' + res + '  has been created!');
			}
			else
			{
				vscode.window.showErrorMessage('Your Class ' + res + '  has been not created!');
			}
		});
		// Display a message box to the user

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
