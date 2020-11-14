# A simple Arduino Class Creator with multiple settings 

This is highly incpired by Maxim's extention ![CPP class creator](https://github.com/tzAcee/cpp-class-creator)


## Features

Press **Alt**+**X** to open the Input Field to create a class, <span style="color:red">**while you are focusing the editor!**</span>

Type in the name, and there you go. You will directly see, when the file is created.

Additionally, you can set the path where the file has to be created: check Settings at the bottom.

![Demo](https://github.com/nilnull/arduino-class-creator/blob/master/giphy.gif?raw=true)

## Known Issues

-Class can be created, while the language is not arduino

## Settings [settings.json of VS-Code]

```"cpp.sfml.*" - ``` Experimental, not really usefull, just for my private usage

```"cpp.creator.setPath": = "string" | null | boolean : [NULL by default] ``` set your path where the class should be created as a string. When it's null your class will be created in the current workspace. Set it to true, when you want a input window to appear on every class creation where you can set creation path. On false or on an empty path input box it will also be created in the current workspace.

```"cpp.creator.createFolder": = boolean : [FALSE by default] ``` set it to true, so a folder for the class will be created in your workspace -> Only possible when setPath is null.

Make Pull Request when you have feature ideas.



## Release Notes



### 1.0.0
Init release of arduino Class Creator.
