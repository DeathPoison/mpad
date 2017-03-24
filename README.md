# mPad  

## Description  

Just a little Markdown-Editor created to write my Daily-Reports at work.  
Used Electron and VueJS to create this little Application.  

Tested on various Ubuntu/Debian based Systems, but any other with be fine!  
I bundled Packages for the following distributions ( OS_ARCH ):  

- darwin-x64
- linux-ia32
- linux-armv7l
- linux-x64
- mas-x64
- win32-ia32 
- win32-x64

## Build from Sources

1. Clone the repository
 ```
 > git clone https://github.com/deathpoison/mpad.git
 ```

1. Install js dependencies
 ```
 > yarn
 # or npm
 > npm install
 ```

1. Start unbundled application
 ```
 > yarn run start
 # or npm
 > npm run start
 ```

1. Bundle application
 ```
 > yarn run build
 # or npm...
 > npm run build

 # change to dist dir of your pc architecture and run "mPad" binary
 > ./mPad
 ```

## Prepare to run mPad

1. Extract files

 Extract tarball of your "OS_ARCH" from: 
 ``` dist/"date %Y-%m-%d"_"date %s"/mPad-"OS_NAME"-"OS_ARCH".tar.gz ```  
 to location of your choice ( my is "~/app/mpad" )

1. Add "mpad" to $PATH

 For Ubuntu it's enough to create a symlink to binary file called "mpad" in: "~/bin"
 
 If not create one or use the existing one  
 and adding the following to your .bashrc for persisten usage
 ```
 PATH=$PATH:$HOME/bin
 export PATH
 ```

 Activate new .bashrc using:
 ```> source ~/.bashrc```

1. [GNOME ONLY] Link to MimeType: text/markdown

 add desktop shortcut -> gnome based systems "open with" dialog  
 
 ```
 [Desktop Entry]
 Name=mPad
 Comment=Markdown Editor
 Exec=mpad %f
 MimeType=text/markdown
 Type=Application
 StartupNotify=true
 Terminal=false
 Categories=Editor;Markdown;Text;Electron;Vue;Webkit;
 ```
 Verify yourself at [Gnome Docs: Desktop Files](https://developer.gnome.org/integration-guide/stable/desktop-files.html.en)

## Run mPad

[GNOME ONLY] Open a FileBrowser and open a Markdown-file  
[GNOME ONLY] choose "mPad" and start reading

Open a FileBrowser and right-click on a Markdown-File  
choose "open file with"  
choose an custom command and use "mpad"  

Optionaly pass a file as argument to open directly from a shell

## Keybindings  


```
Ctrl + 

  e  => Open Markdown-Editor
  h  => Open Help
  o  => Open File
  n  => New File   // clear Editor
  s  => Save Document
  q  => Quit Application

```

## TODO's

- FIX: editor's height
- FIX: editor toggle's to top, sometimes...
- FIX: recover cursor position on change
- FIX: in some cases the ctrl key is fixed...  
 ```just type ctrl again as little workaround here...```

- ADD: tutorial to create a gtk desktop link
- ADD: status indicator
- ADD: settings pane
- ADD: transitions
- ADD: export for markdown, text, html or pdf
- ADD: autosave
- ADD: settings via user's app config dir

- TODO: prevent clicking links? or not?
- TODO: break mac compatibility... just for the lulz

## Author

David Crimi ~ LimeBlack

## Big Thanks to

[Electron](https://electron.atom.io/)  
[MarkedJS](https://github.com/chjj/marked)  
[VueJS](https://vuejs.org/)  
[Electron-Context-Menu](https://github.com/sindresorhus/electron-context-menu)  
[Webkit](https://webkit.org/)  
[Sublime](https://www.sublimetext.com/)  

## License

Copyright (c) 2017-2020, David Crimi. (MIT License)  
  
See LICENSE for more info.  

