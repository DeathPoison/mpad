# mPad  

## Description  

Just a little Markdown-Editor created to write my Daily-Reports at work.  
Used Electron and VueJS to create this little Application.  

## Just run mPad

To run mPad just change to the build-dir of your Platform and run mPad binary.  

Optionally pass a file as argument to open. 

## Install Sources

1. Clone the Repo
 ```
 > git clone https://github.com/deathpoison/mpad.git
 ```

1. Install dependencies
 ```
 # using yarn
 > yarn

 # or npm
 > npm install
 ```

1. Start development Application
 ```
 > yarn run start

 # or npm
 > npm run start
 ```

1. Bundle Application
 ```
 > npm run build
 # change to build dir of your pc architecture and run "mPad" binary
 > ./mPad
 ```

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

