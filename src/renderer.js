const marked = require('marked')
const app    = require('electron').remote
const dialog = app.dialog     // deps for file dialog
const fs     = require('fs')
const path   = require('path')

// .min for production mode
const Vue = require( path.join(__dirname, '../node_modules/vue/dist/vue.min.js'))

var Application = new Vue({
  el: '#markdown',
  data: {
    input_orig:  '# Hello World',
    input:       '# Hello World',
    edit:        false,
    view:        'editor',
    keyMap:      {},
    helpText:    '',
    fileName:    undefined,
    shouldClose: false,
    styles:      {
      base: '../assets/basic.css',
      theme: 'LimeBlack',
      themes: []
    }
  },
  computed: {
    // returns rendered Markdown as HTML
    rmd: function () {
      // grande for better ...mucho
      return marked(this.input, { sanitize: true })
    },

    // returns css links as HTML
    activeThemes: function () {
      let thpath = '<link rel="stylesheet" type="text/css" href="'+path.join(__dirname, '../assets/basic.css')+'">'
      thpath += "\n"
      this.styles.themes.forEach( function (el) {
        if ( this.styles.theme === el.name ) {
          thpath += '<link rel="stylesheet" type="text/css" href="'+path.join(__dirname, el.path)+'">'
          thpath += "\n"
        }
      }.bind(this))
      return thpath
    },

    // returns active screen
    screen: function () {
      switch (this.view) {
        case 'help':
          return this.helpText 
      }
      return this.rmd
    }
  },
  filters: {
    ucfirst: function (inp) {
      // grande for better ...mucho
      return inp.charAt(0).toUpperCase() + inp.slice(1);
    }
  },
  methods: {

    update:         function (e) { this.input = e.target.value },
    replaceInput:   function (e) { 
      this.input = e.target.result 
      this.input_orig = this.input
    },

    toggleHelp: function (e) {
      if ( this.view !== 'help' )
        this.lastview = this.view

      //console.log( 'current', this.view, 'last', this.lastview )
      this.view = ( this.view === 'help' ) ? this.lastview : 'help'
    },

    toggleEditor: function (e) {
      this.edit = !this.edit
      // set focus to editor if visible
      if ( this.edit ) {
        setTimeout( function () {
          //let editor = this.$el.querySelector('#editor')
          let editor = this.$refs.editor
          
          if ( typeof editor != 'undefined' )
            editor.focus()
          
        }.bind(this), 200 )
      }      
    },

    // close handling
    closeApplication: function () {
      if ( this.input != this.input_orig ) {
        let wannaSave = confirm('You have unsaved changes,'+"\n"+'want to save?')
        if (wannaSave) {
          this.shouldClose = true
          this.safeMarkdown()
          return
        }
      }
      close()
    },

    // File dialogs
    openMarkdown: function (e) {
      // grande for better ...mucho
      dialog.showOpenDialog( this.fetchFile )
    },
    safeMarkdown: function () {
      if ( !this.fileName )
        dialog.showSaveDialog( this.safeFile )
      else
        this.writeFile()
    },

    // File getters    
    safeFile: function ( fileName ) {
      if ( fileName == undefined ) 
        fileName = this.fileName

      if ( fileName == undefined ) return
      //  console.log('You did not save the file')

      this.fileName = fileName
      this.writeFile( fileName )
    },
    fetchFile: function ( fileNames ) {
      if ( fileNames === undefined ) return
      //  console.log('No file selection')
      this.fileName = fileNames[0]
      this.loadFile(fileNames[0])
    },
    newFile: function () {
      this.input_orig = ''
      this.input = ''
      this.fileName = undefined
    },

    // File Handling
    writeFile: function ( filename ) {
      if ( typeof filename == 'undefined' )
        filename = this.fileName

      fs.writeFile( filename, this.input, function (err) {
        if (err) return
        //  console.log('An error ocurred while creating the file' + err.message)

        this.input_orig = this.input

        if ( this.shouldClose )
          close()
      }.bind(this))
    },
    loadFile: function ( filename ) {
      if ( typeof filename == 'undefined' )
        filename = this.fileName
      
      //console.log('no filename given')
      if ( typeof filename == 'undefined' ) return false

      fs.readFile( filename, 'utf-8', function (err, data) {
        //  console.log('An error ocurred while reading the file' + err.message)
        if (err)  return

        this.input      = data
        this.input_orig = data
      }.bind(this))
    },

    // keyhandler
    keyDownHandler: function (e) { 
      // console.log('Key down:', e.keyCode)
      this.keyMap[e.keyCode] = true 
    },
    keyUpHandler: function (e) {
      // quit: ctrl + q 
      if ( this.keyMap[17] && this.keyMap[81] )
        this.closeApplication()

      // save | export: ctrl + s
      if ( this.keyMap[17] && this.keyMap[83] )
        this.safeMarkdown()

      // import file: ctrl + o
      if ( this.keyMap[17] && this.keyMap[79] )
        this.openMarkdown()

      // import file: ctrl + n
      if ( this.keyMap[17] && this.keyMap[78] )
        this.newFile()

      // import file: ctrl + i
      if ( this.keyMap[17] && this.keyMap[73] )
        this.openMarkdown()

      // open help overlay: ctrl + h
      if ( this.keyMap[17] && this.keyMap[72] )
        this.toggleHelp()

      // open editor
      if ( this.keyMap[17] && this.keyMap[69] )
        this.toggleEditor()

      this.keyMap[e.keyCode] = false
    },
  },

  // on created
  created: function () {
    window.addEventListener('keyup', this.keyUpHandler)
    window.addEventListener('keydown', this.keyDownHandler)
  },

  mounted: function () {
    // load themes
    fs.readdir(path.join(__dirname, '../assets/themes/' ), (err, dir) => {
      for (var i = 0, thpath; thpath = dir[i]; i++) {
        this.styles.themes.push({
          name: thpath.split('.')[0],
          path: '../assets/themes/'+thpath
        })
      }
    });

    // load help text
    fs.readFile( path.join(__dirname, 'templates/help.html'), 'utf-8', function (err, data) {
        //  console.log('An error ocurred while reading the help file' + err.message)
        if (err) return

        this.helpText = data
      }.bind(this)
    )

    // load cli arguments
    arguments = app.getGlobal('sharedObject').args;

    // load file if any givven
    if (arguments.length >= 2 ) {
      let filename
      let file =  arguments[arguments.length-1]

      if ( fs.existsSync(file) ) {
        filename = file
      } else if ( fs.existsSync(path.join(process.cwd(), file) ) ) {
        filename = path.join(process.cwd(), file)
      }
      /* else {
        console.log('cant find given file...')
      } */

      // check if the file exists
      this.fileName = filename
      this.loadFile( filename )
    }
  }
})
