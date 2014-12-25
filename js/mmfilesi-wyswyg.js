/*!
 * editor mmfilesi 0.1
 * author: marcos méndez filesi
 * Licensed under MIT
 */

;(function ( $, window, document, undefined ) {

    var editorMM = "editorMM",
        defaults = {
        	style: {'bgPrimary':'ccc', 'textPrimary':'000', 'width':'800px', 'height':'100%'},
          buttons: [ 'code', 'colors', 'colors-bk', 'sep', 'bold', 'italic', 'underline', 'strikeThrough', 'smallCaps', 'subscript', 'superscript', 'header', 'br',
                    'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'sep', 'insertUnorderedList', 'insertOrderedList', 'table', 'sep', 'link', 
                    'img', 'filmstrip','smile', 'sep', 'undo', 'redo', 'removeFormat'],
          /* colors selection from CITAR */
          colors: ['000000', '424242', '636363', '9C9C94', 'CEC6CE', 'EFEFEF', 'F7F7F7', 'FFFFFF',
                  'FF0000', 'FF9C00', 'FFFF00', '00FF00', '00FFFF', '0000FF', '9C00FF', 'FF00FF',
                  'F7C6CE', 'FFE7CE', 'FFEFC6', 'D6EFD6', 'CEDEE7', 'CEE7F7', 'D6D6E7', 'E7D6DE',
                  'E79C9C', 'FFC69C', 'FFE79C', 'B5D6A5', 'A5C6CE', '9CC6EF', 'B5A5D6', 'D6A5BD',
                  'E76363', 'F7AD6B', 'FFD663', '94BD7B', '73A5AD', '6BADDE', '8C7BC6', 'C67BA5',
                  'CE0000', 'E79439', 'EFC631', '6BA54A', '4A7B8C', '3984C6', '634AA5', 'A54A7B',
                  '9C0000', 'B56308', 'BD9400', '397B21', '104A5A', '085294', '311873', '731842',
                  '630000', '7B3900', '846300', '295218', '083139', '003163', '21104A', '4A1031'],
          lang: 'es'
        };

        lang = {
        	'es': {'colors':'colores', 'colors-bk':'color de fondo', 'bold':'negrita', 'italic':'cursiva', 'underline':'subrayado', 'smallCaps':'versalitas', 'strikeThrough':'tachado', 'header':'encabezado',
          'subscript':'subíndice', 'superscript':'superíndice',
                'align-left':'izquierda', 'align-center':'centrado', 'align-right':'derecha', 'align-justify':'justfificado', 'list':'lista ordenada', 'list-number':'lista desordenada',
                'link':'enlace', 'img':'imagen', 'div':'separador', 'removeFormat':'borrar estilos', 'undo':'deshacer', 'redo':'rehacer', 'code':'código', 'paragraph':'párrafo'},
            'eng': {}
        };

    function EditorMM( element, options ) {

        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
      //  this._defaults = defaults;
      //  this.name = editorMM;
        this.init();        
    }

   EditorMM.prototype = {

        init: function() {
           	this.options.buttons = this.toolbarOptions(this.options);
           	this.toolbarInsert(this.element, this.options);
            this.toolbarBind(this.element, this.options);
        },

        toolbarOptions: function(options) {  // HACER POR MAP!!!!!!!!!!
        	var buttons = [];
        	for (var i=0, len=options.buttons.length; i<len; i++) {
        		buttons.push( {'action':options.buttons[i], 'title':lang[options.lang][options.buttons[i]] });
        	};
        	return buttons;
        },

        toolbarInsert: function(el, options) {
         	var stringToolbar     = "";
          var stringDivEditable = "";
          stringToolbar += "<div class='toolbar' style='width:"+options.style.width+"'>";
        	for (var i=0, len=options.buttons.length; i<len; i++) {
            if ( options.buttons[i].action != "sep" &&  options.buttons[i].action != "br" ) {       		
              stringToolbar += "<button class='buttonsToolbar js-buttons' title='"+options.buttons[i].title+"' id='js-"+options.buttons[i].action+"' data-type='"+options.buttons[i].action+"'>";
              stringToolbar += "<span class='icon-"+options.buttons[i].action+"'></span>";
              stringToolbar += "</button>";
              if ( options.buttons[i].action == "header" ) {
                stringToolbar += "<div class='toolbarCommonPanel' id='headerPanel'><ul>";
                  for (var c=0; c<7; c++) {
                    stringToolbar += "<li class='js-optionHeader' data-header='"+(c+1)+"' style='font-size:"+(18-c)+"px'>";
                    stringToolbar += options.buttons[i].title + " " +(c+1);
                    stringToolbar += "</li>";
                  } 
                stringToolbar += "</ul><p class='js-optionHeader' data-header='par'>"+lang[options.lang].paragraph+"</p></div>";
              }
              if ( options.buttons[i].action == "link" ) {
                stringToolbar += "<div class='toolbarCommonPanel' id='linkPanel'>";
                  PANEL ENLACES 
                stringToolbar += "</div>";
              }
              if ( options.buttons[i].action == "colors" ) {
                stringToolbar += "<div class='toolbarCommonPanel' id='colorsPanel'>";
                  for ( var d=0, led = options.colors.length; d<led; d++) {
                      stringToolbar += "<div class='colorsTile js-optionColor' style='background:#"+options.colors[d]+"' data-color="+options.colors[d]+"></div>";
                  } 
                stringToolbar += "</div>";
              }
            } else if (options.buttons[i].action == "br") {
              stringToolbar += "<br>";
            } else {
              stringToolbar += "<div class='buttonsToolbarSep'></div>";
            }
        	}
          stringToolbar += "</div>";          
          stringDivEditable = "<div id='editor-mm' contenteditable='true' style='width:"+options.style.width+"'>"+ $(el).val()+"</div>";
          $(el).before(stringToolbar+stringDivEditable).hide();
          stringToolbar = stringDivEditable = null;
        },

        toolbarBind: function(el, options) {
          var self = this;
        	$('.js-buttons').mousedown(function(event) {
            event.preventDefault();
            this.action = $(this).attr('data-type');
            switch (this.action) {
              case "bold":
              case "italic":
              case "underline":
              case "strikeThrough":
              case "subscript":
              case "superscript":
              case "justifyCenter":
              case "justifyRight":
              case "justifyLeft":
              case "justifyFull":
              case "insertUnorderedList":
              case "insertOrderedList":
              case "removeFormat": // ESTE HACER MEJOR SELECCIONANDO EL TEXTO Y BORRÁNDOLO
              case "undo":
              case "redo":
              
              case "unlink":  /// PENDIENTE         
              document.execCommand(this.action, false, null);
              break;
              case "colors-bk":
              case "colors":
                self.colorButton(this.action);
              break;
              case "smallCaps":               
                self.nodeButton("span", "font-variant:small-caps;");
              break;
              case "header":         
                self.headerButton();
              break;
              case "code":         
                self.showCodeButton(el);
              break;
            }
          });

        },

        nodeButton: function(node, nodeStyle) {
          var nodeStyle = nodeStyle || 'withoutStyle';
          var selObj, selRange, newNode;          
          selObj = this.getSelection();         
          if ( selObj.type != 'None' && selObj.isCollapsed === false ) {
            newNode = document.createElement(node);
            if ( nodeStyle != 'withoutStyle' ) {
              newNode.style.cssText = nodeStyle;
            }
            selRange = selObj.getRangeAt(0);
            documentFragment = selRange.extractContents();
            newNode.appendChild(documentFragment);
            selRange.insertNode(newNode);
            selObj.removeAllRanges();
          }
        },

        headerButton: function() { ////////// PENDIENTE, BORRAR CABECERA CUANDO SEA UN PÁRRAFO
          var self = this;
          var headerPanel = $('#headerPanel');
          var selObj, newNode; 
          var selRange = null;
          function unbindButton() {
            headerPanel.slideUp(600).removeClass('js-active');
            $('.js-optionHeader').unbind('click');
            headerPanel = null;
          }
          selObj = self.getSelection();          
          if ( selObj.type != 'None' && selObj.isCollapsed === false ) {
            selRange = selObj.getRangeAt(0);
          }
          if ( headerPanel.hasClass('js-active') ) {
            unbindButton();
          } else {
            headerPanel.css('left', $('#js-header').offset().left).slideDown(600).addClass('js-active');
            $('.js-optionHeader').click(function() {
              if(selRange !== null ) {
                self.restoreSelection(selRange);
                self.nodeButton("h"+$(this).attr('data-header'));
              }               
              unbindButton();            
            });
          }
        },

        colorButton: function(action) {
          var self = this;
          var colorPanel = $('#colorsPanel');
          var selObj, newNode, atribute; 
          var selRange = null;

          function unbindButton() {
            colorPanel.slideUp(600).removeClass('js-active');
            $('.js-optionColor').unbind('click');
          }
          selObj = self.getSelection();          
          if ( selObj.type != 'None' && selObj.isCollapsed === false ) {
            selRange = selObj.getRangeAt(0);
          }

          if ( colorPanel.hasClass('js-active') ) {
            unbindButton();
          } else {
            colorPanel.css('left', $('#js-colors').offset().left).slideDown(600).addClass('js-active');
            $('.js-optionColor').click(function() {
              if(selRange !== null ) {
                self.restoreSelection(selRange);
                if ( action == "colors" ) {
                  atribute = "color:#"+$(this).attr('data-color')+";"
                } else {
                  atribute = "background:#"+$(this).attr('data-color')+";"
                }
                self.nodeButton("span", atribute);
              }
              unbindButton();            
            });
          }
        },

        showCodeButton: function(el) {
          var textArea = $(el);
          var editor   = $('#editor-mm');
          textArea.css('width', editor.css('width')).css('height', editor.css('height')).css('box-sizing', 'border-box');
          $('#js-code').unbind('mousedown');
          $('#js-code').click(function() {
            $(this).toggleClass('js-active');
            if ( $(this).hasClass('js-active') ) { 
              textArea.val(editor.html()).css('display','block');
              editor.css('display','none');
            } else {
              textArea.css('display','none');
              editor.html(textArea.val()).css('display','block');
            }
          });
        },

        getSelection: function() {
          if (window.getSelection) {
              return window.getSelection();
          } else { /* IE old */
              if (document.selection.createRange) {
                  return document.selection.createRange();                        
              }
          }
        },

        /* function from CITAR BOTS */
        restoreSelection: function(selRange) {
            var selection = window.getSelection();
            if (selRange) {
                try {
                selection.removeAllRanges();
                } catch (ex) {
                document.body.createTextRange().select();
                document.selection.empty();
                }
            selection.addRange(selRange);
            }
        }

    }

    $.fn[editorMM] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "pEditorMM")) {
                $.data(this, "pEditorMM",
                new EditorMM( this, options ));
            }
        });
    };

})( jQuery, window, document );