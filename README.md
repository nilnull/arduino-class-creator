# Arduino Class Creator

A simple and easy to use Arduino Class Creator with multiple settings 

## How to use
Press **Alt**+**X** (or **⌥**+**X** in Mac) to open the Input Field to create a class, <span style="color:red">**while you are focusing the editor!**</span>

Type in the name, and there you go. You will directly see, when the file is created.

Additionally, you can set the path where the file has to be created: check Settings at the bottom.

![Demo](https://github.com/nilnull/arduino-class-creator/blob/master/giphy.gif?raw=true)


## Features
- Generates header and class files
- Can use different path and folders
- Auto creates constructor and deconstruction
- Auto generates header guard


## Known Issues

-Nothing yet


## Settings

[settings.json of VS-Code]
```"arduino.sfml.*" - ``` Experimental, not really usefull, just for my private usage

```"arduino.creator.setPath": = "string" | null | boolean : [NULL by default] ``` set your path where the class should be created as a string. When it's null your class will be created in the current workspace. Set it to true, when you want a input window to appear on every class creation where you can set creation path. On false or on an empty path input box it will also be created in the current workspace.

```"arduino.creator.createFolder": = boolean : [FALSE by default] ``` set it to true, so a folder for the class will be created in your workspace -> Only possible when setPath is null.

Make Pull Request when you have feature ideas.




---
**NOTE**

This is highly inspired by Maxim's extension [c++ class creator](https://github.com/tzAcee/cpp-class-creator) 

---