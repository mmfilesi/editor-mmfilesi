/*!
 * editor mmfilesi 0.1
 * author: marcos méndez filesi
 * Licensed under MIT
 */

 /* Todo: botón tabla, botón vídeo, añadir opción width y height, cambiar ids x clases donde falte */

;(function ( $, window, document, undefined ) {

    var editorMM = "editorMM";
    var defaults = {
        	style: {'bgPrimary':'ccc', 'textPrimary': '000', 'width': '800px', 'height': '100%'},
          buttons: [ 'code', 'colors', 'colors-bk', 'sep', 'bold', 'italic', 'underline', 'strikeThrough', 'smallCaps', 'subscript', 'superscript', 'header', 'br',
                    'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'sep', 'insertUnorderedList', 'insertOrderedList', 'table', 'sep', 'link', 'unlink', 
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

  var lang = {
        	'es': {'colors': 'colores', 'colors-bk': 'color de fondo', 'bold': 'negrita', 'italic': 'cursiva', 'underline': 'subrayado', 'smallCaps': 'versalitas', 'strikeThrough': 'tachado', 'header': 'encabezado',
          'subscript': 'subíndice', 'superscript': 'superíndice',
                'align-left': 'izquierda', 'align-center': 'centrado', 'align-right': 'derecha', 'align-justify': 'justfificado', 'list': 'lista ordenada', 'list-number': 'lista desordenada',
                'link': 'enlace', 'img': 'imagen', 'div': 'separador', 'removeFormat': 'borrar estilos', 'undo': 'deshacer', 'redo': 'rehacer', 'code': 'código', 'paragraph': 'párrafo', 'route': 'ruta', 'height': 'alto', 'width': 'ancho', 'responsive': 'responsive', 'options': 'opciones', 'caption': 'leyenda', 'align': 'alinear', 'done': 'aceptar' },
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
                stringToolbar += "<div class='toolbarCommonPanel headerPanel'><ul>";
                  for (var c=0; c<7; c++) {
                    stringToolbar += "<li class='js-optionHeader' data-header='"+(c+1)+"' style='font-size:"+(18-c)+"px'>";
                    stringToolbar += options.buttons[i].title + " " +(c+1);
                    stringToolbar += "</li>";
                  } 
                stringToolbar += "</ul><p class='js-optionHeader' data-header='par'>"+lang[options.lang].paragraph+"</p></div>";
              }
              if ( options.buttons[i].action == "link" ) {
                stringToolbar += "<div class='toolbarCommonPanel linkPanel'>";
                stringToolbar += "<input type='text' class='inputsToolbar inputWithIcon js-inputLink' placeholder='www.url.com'>";
                stringToolbar += "<span class='iconInput success icon-success submitLink'></span>"; 
                stringToolbar += "</div>";
              }
              if ( options.buttons[i].action == "img" ) {
                stringToolbar += "<div class='toolbarCommonPanel imgPanel'>";
                stringToolbar += "<p><input type='text' name='js-inputRoute' class='inputsToolbar js-inputRoute inputLin' placeholder=''><label for='js-inputRoute'>"+lang[options.lang].route+"</label></p>";
                stringToolbar += "<p><input type='text' name='js-inputWidth' class='inputsToolbar js-inputWidth inputLin' placeholder='ie, 100px / 100%'><label for='js-inputWidth'>"+lang[options.lang].width+"</label></p>";
                stringToolbar += "<p><input type='text' class='inputsToolbar js-inputHeight inputLin' placeholder='ie, 100px / 100%'><label for='js-inputWidth'>"+lang[options.lang].height+"</label></p>";
                stringToolbar += "<p><input type='checkbox' class='js-inputResponsive'> "+lang[options.lang].responsive+"</p>";
                stringToolbar += "<p class='moreOptions'>+</p>";
                stringToolbar += "<div class='imgSuboptions' style='display:none;'>";
                stringToolbar += "<p><input type='text' name='js-inputAlt' class='inputsToolbar js-inputAlt inputLin' placeholder=''><label for='js-inputAlt'>alt</label></p>";
                stringToolbar += "<p><input type='text' name='js-inputTitle' class='inputsToolbar js-inputTitle inputLin' placeholder=''><label for='js-inputTitle'>title</label></p>";
                stringToolbar += "<p><input type='text' class='inputsToolbar js-inputCaption inputLin' placeholder=''><label for='js-inputCaption'>"+lang[options.lang].caption+"</label></p>";
                stringToolbar += "<p><label>"+lang[options.lang].align+"</label><span class='checkIcon icon-justifyLeft js-alignImg' data-float='left'></span><span class='checkIcon icon-justifyCenter js-alignImg' data-float='center'></span><span class='checkIcon roundButton icon-justifyRight js-alignImg' data-float='right'></span></p>";
                stringToolbar += "</div>";
                stringToolbar += "<p style='text-align:center;' class='js-submitImg'><button class='buttonDone'>"+lang[options.lang].done+"</button></p>";
                stringToolbar += "</div>";
              }
              if ( options.buttons[i].action == "smile" ) {
                stringToolbar += "<div class='toolbarCommonPanel smilePanel'>";
                for ( var s=0; s < 39; s++ ) {
                  stringToolbar += "<img src='icons/"+s+".png' width='24' height='24' class='js-smile'>";                  
                }
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

        /* HACER UN BOTÓN PARA QUE PUEDAN AÑADIR ESTILOS */

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
              case "unlink":      
                document.execCommand(this.action, false, null);
              break;
              case "link":
                self.linkButton($(this));
              break;
              case "colors-bk":
              case "colors":
                self.colorButton(this.action);
              break;
              case "smallCaps":               
                self.nodeButton("span", "font-variant:small-caps;");
              break;
              case "header":         
                self.headerButton($(this));
              break;
              case "img":         
                self.imgButton($(this));
              break;
              case "smile":
                self.smileButton($(this));
              break;
              case "code":         
                self.showCodeButton(el);
              break;
            }
          });

        },

        nodeButton: function(node, nodeStyle) { /* todo */ // NULLIFICAR Y TAL
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

        headerButton: function(button) { /* done */
          
          var self          = this;
          var button        = button;
          var headerPanel   = button.next('.headerPanel');
          var selectHeader  = headerPanel.find('.js-optionHeader');
          var selObj        = null;
          var newNode       = null; 
          var selRange      = null;
                    
          function unbindButton() {
            headerPanel.slideUp(600);
            button.removeClass('js-active');
            $('.js-optionHeader').unbind('click');
            button = headerPanel = selectHeader = selObj = newNode = selRange = null;
          }

          selObj = self.getSelection();          
          
          if ( selObj.type != 'None' && selObj.isCollapsed === false ) {
            selRange = selObj.getRangeAt(0);
          }

          if ( button.hasClass('js-active') ) {
            unbindButton();

          } else {
            headerPanel.css('left', $('#js-header').offset().left).slideDown(600);
            button.addClass('js-active');
            selectHeader.click(function() {
              if(selRange !== null ) {
                self.restoreSelection(selRange);
                if ( $(this).attr('data-header') != 'par' ) {
                  self.nodeButton("h"+$(this).attr('data-header'));
                } else {
                  document.execCommand('formatBlock', false, 'p');
                }
              }               
              unbindButton();            
            });
          }

        }, /* #headerButton */

        linkButton: function(button) { /* done */

          var self        = this;
          var button      = button;
          var linkPanel   = button.next('.linkPanel');
          var inputLink   = linkPanel.find('.js-inputLink');
          var submitLink  = linkPanel.find('.submitLink');
          var selRange    = null;
          var selObj      = null;
          var href        = null;

          function unbindButton() {
            linkPanel.slideUp(600);
            submitLink.unbind('click');
            button.removeClass('js-active');
            inputLink.val('');
            button = linkPanel = inputLink = submitLink = selRange = selObj = href = null;
          }       

          selObj = self.getSelection();          
          if ( selObj.type != 'None' && selObj.isCollapsed === false ) {
            selRange = selObj.getRangeAt(0);
          }

          if ( button.hasClass('js-active') ) {
            unbindButton();
            button.removeClass('js-active');

          } else {
            button.addClass('js-active');
            linkPanel.css('left', button.offset().left).slideDown(600);           
            submitLink.click(function() {
              if (selRange !== null ) {
                self.restoreSelection(selRange);
                href = inputLink.val().trim().toLowerCase();
                href = ( href.indexOf('http://') == -1 && href.indexOf('https://') == -1 ) ? 'http://'+href : href;
                document.execCommand("createLink", false, href);
              }          
              unbindButton();            
            });
          }

        }, /* #linkButton */

        imgButton: function(button) { /* done */ 

          var self            = this;
          var button          = button;
          var imgPanel        = button.next('.imgPanel');
          var inputRoute      = imgPanel.find('.js-inputRoute');
          var inputHeight     = imgPanel.find('.js-inputHeight');
          var inputWidth      = imgPanel.find('.js-inputWidth');
          var inputResponsive = imgPanel.find('.js-inputResponsive');
          var inputAlt        = imgPanel.find('.js-inputAlt');
          var inputTitle      = imgPanel.find('.js-inputTitle');
          var inputCaption    = imgPanel.find('.js-inputCaption');
          var alignImg        = imgPanel.find('.js-alignImg');
          var moreOptions     = imgPanel.find('.moreOptions');
          var submitImg       = imgPanel.find('.js-submitImg');
          var imgSuboptions   = imgPanel.find('.imgSuboptions');
          var selObj          = null;
          var newNode         = null; 
          var selRange        = null;
          var stringImg       = null;
          
          function unbindButton() {
            imgPanel.slideUp(600).removeClass('js-active');
            button.removeClass('js-active');
            inputResponsive.unbind('click').prop('checked', false); 
            moreOptions.unbind('click').text('+');            
            submitImg.unbind('click');
            alignImg.unbind('click');
            inputRoute.val('');
            inputHeight.val('');
            inputWidth.val('');
            inputAlt.val('');
            inputTitle.val('');
            inputCaption.val('');
            imgSuboptions.css('display','none');
            alignImg.removeClass('js-active').removeClass('success');
            selObj = newNode = selRang = stringImg = null;
          }
          
          selObj = self.getSelection();          
          if ( selObj.type != 'None' ) {
            selRange = selObj.getRangeAt(0);
          }
          
          if ( button.hasClass('js-active') ) {
            unbindButton();

          } else {
            imgPanel.css('left', button.offset().left).slideDown(600);
            button.addClass('js-active');
           
            inputResponsive.click(function() {
              if ( $(this).prop('checked') ) {
                inputWidth.val('100%');
                inputHeight.val('auto');
              }              
            });

            moreOptions.click(function() {
              if ( $(this).hasClass('js-active') ) {
                imgSuboptions.slideUp('fast', function() {
                  moreOptions.text('+').removeClass('js-active');
                });
              } else {
                imgSuboptions.slideDown('fast', function() {
                  moreOptions.text('-').addClass('js-active');
                });
              }
            });

            alignImg.click(function() {              
              if ( $(this).hasClass('js-active') ) {
                $(this).removeClass('js-active').removeClass('success');
              } else {
                alignImg.removeClass('js-active').removeClass('success');
                $(this).addClass('js-active').addClass('success');
              }
            });

            submitImg.click(function() {
              var temp;
              if( selRange !== null ) {
                self.restoreSelection(selRange);
                temp = imgSuboptions.find('.js-active').attr('data-float');
                console.log(temp)
                console.log(imgSuboptions.find('.js-active'))
                if ( temp == 'left' ) {
                  temp = "style='float:left;'";
                } else if ( temp == 'right' ) {
                  temp = "style='float:right;'";
                } else if ( temp == 'center' ) {
                  temp = "style='margin: 0 auto; text-align:center;'";
                } else {
                  temp = "";
                }
                stringImg = "<figure "+temp+">";
                stringImg += "<img src='"+inputRoute.val()+"' width='"+inputWidth.val()+"' height='"+inputHeight.val()+"' alt='"+inputAlt.val()+"' title='"+inputTitle.val()+"'>";
                if ( inputCaption.val() != '' ) stringImg += "<figcaption>"+inputCaption.val()+"</figcaption>"
                stringImg += "</figure>";
                self.insertHtmlAfterSelection(stringImg);                
              }          
              unbindButton();            
            });
          }

        }, /* #imgButton */

        smileButton: function(button) { /* done */

          var self        = this;
          var button      = button;
          var smilePanel  = button.next('.smilePanel');
          var selRange    = null;
          var selObj      = null;
          var newNode     = null;
          var route       = null;

          function unbindButton() {
            smilePanel.slideUp(600);
            button.removeClass('js-active');
            $('.js-smile').unbind('click');
            selRange = selObj = newNode = route = null;
          }  

          selObj = self.getSelection();
          if ( selObj.type != 'None' ) {
            selRange = selObj.getRangeAt(0);
          }

          if ( button.hasClass('js-active') ) {
            unbindButton();           

          } else {
            smilePanel.css('left', button.offset().left).slideDown(600);
            button.addClass('js-active');
            $('.js-smile').click(function() {
              if ( selRange !== null ) {
                self.restoreSelection(selRange);
                route = $(this)[0].src;
                newNode = new Image(24, 24);
                newNode.src = route;
                newNode.style.verticalAlign = "bottom";
                selRange.insertNode(newNode);               
              }          
              unbindButton();
            });
          }

        }, /* #smileButton */

        colorButton: function(action) { /* TODO */
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

        showCodeButton: function(el) { /* TODO */
          var textArea = $(el);
          var editor   = $('#editor-mm');
          textArea.css('width', editor.css('width')).css('height', editor.css('height')).css('box-sizing', 'border-box');
          $('#js-code').unbind('mousedown');
          $('#js-code').click(function() {
            $(this).toggleClass('js-active');
            if ( $(this).hasClass('js-active') ) { 
              textArea.val(editor.html()).css('display','block');
              editor.css('display','none');
              $('.js-buttons').addClass('buttonDisabled');
              $(this).removeClass('buttonDisabled');
            } else {
              textArea.css('display','none');
              editor.html(textArea.val()).css('display','block');
              $('.js-buttons').removeClass('buttonDisabled');
            }
          });
        },

        getSelection: function() {
          if (window.getSelection) {
              return window.getSelection();
          } else {
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
        },

        /* Function by Tim Down 
        http://stackoverflow.com/questions/3597116/insert-html-after-a-selection */
        insertHtmlAfterSelection: function(html) {
          var sel, range, expandedSelRange, node;
          if (window.getSelection) {
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                  range = window.getSelection().getRangeAt(0);
                  expandedSelRange = range.cloneRange();
                  range.collapse(false);

                  // Range.createContextualFragment() would be useful here but is
                  // non-standard and not supported in all browsers (IE9, for one)
                  var el = document.createElement("div");
                  el.innerHTML = html;
                  var frag = document.createDocumentFragment(), node, lastNode;
                  while ( (node = el.firstChild) ) {
                      lastNode = frag.appendChild(node);
                  }
                  range.insertNode(frag);

                  // Preserve the selection
                  if (lastNode) {
                      expandedSelRange.setEndAfter(lastNode);
                      sel.removeAllRanges();
                      sel.addRange(expandedSelRange);
                  }
              }
          } else if (document.selection && document.selection.createRange) {
              range = document.selection.createRange();
              expandedSelRange = range.duplicate();
              range.collapse(false);
              range.pasteHTML(html);
              expandedSelRange.setEndPoint("EndToEnd", range);
              expandedSelRange.select();
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