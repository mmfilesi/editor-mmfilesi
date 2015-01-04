/*!
 * editor mmfilesi 0.1
 * author: marcos méndez filesi: www.mmfilesi.com
 * Licensed under MIT
 */

;(function ( $, window, document, undefined ) {

  var editorMM = "editorMM";

  var defaults = {
    style: { 'bgPrimary':'ccc', 'textPrimary': '000', 'width': '800px', 'height': '100%' },
    buttons: [ 'colors', 'colors-bk', 'sep', 'bold', 'italic', 'underline', 'strikeThrough', 'smallCaps', 'subscript', 'superscript', 'header', 'sep', 'insertUnorderedList', 'insertOrderedList', 'sep', 'code', 'br',
              'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'sep', 'link', 'unlink', 'sep', 'img', 'filmstrip', 'sep', 'smile', 'sep', 'undo', 'redo', 'removeFormat'],
    colors: [ '000000', '404040', '636363', '808080', 'A0A0A0', 'C0C0C0', 'E0E0E0', 'FFFFFF',
              '660033', '99004C', 'CC0066', 'FF007F', 'FF3399', 'FF66B2', 'FF99CC', 'FFCCE5',
              '660066', '990099', 'CC00CC', 'FF00FF', 'FF33FF', 'FF66FF', 'FF99FF', 'FFCCCC',
              '330066', '4C0099', '6600CC', '7F00FF', '9933FF', 'B266FF', 'CC99FF', 'E5CCFF',
              '000066', '000099', '0000CC', '0000FF', '3333FF', '6666FF', '9999FF', 'CCCCFF',
              '003366', '004C99', '0055CC', '0080FF', '3399FF', '66B2FF', '99CCFF', 'CCE5FF',
              '006666', '009999', '00CCCC', '00FFFF', '33FF99', '66FFB2', '99FFCC', 'CCFFE5',
              '006600', '009900', '00CC00', '00FF00', '99FF33', 'B2FF66', 'CCFF99', 'E5FFCC',
              '336600', '4C9900', '66CC00', '999900', 'CCCC00', 'FFFF00', 'FFFF99', 'FFFFCC',
              '663300', '994C00', 'CC6600', 'FF8000', 'FF9933', 'FFB266', 'FFCC99', 'FFE5CC',
              '660000', '990000', 'CC0000', 'FF0000', 'FF3333', 'FF6666', 'FF9999', 'FFCCCC' ],
    lang: 'eng'
  };

  var lang = {
              'es': { 'colors': 'colores', 'colors-bk': 'color de fondo', 'bold': 'negrita', 'italic': 'cursiva', 'underline': 'subrayado', 'smallCaps': 'versalitas', 'strikeThrough': 'tachado', 'header': 'encabezados',
                    'subscript': 'subíndice', 'superscript': 'superíndice', 'justifyLeft': 'izquierda', 'justifyCenter': 'centrado', 'justifyRight': 'derecha', 'justifyFull': 'justfificado', 'insertOrderedList': 'lista ordenada', 'insertUnorderedList': 'lista desordenada',
                    'table': 'tabla', 'link': 'enlace', 'unlink': 'quitar enlace', 'img': 'imagen', 'filmstrip': 'audiovisual', 'smile': 'emoticono', 'div': 'separador', 'removeFormat': 'borrar estilos', 'undo': 'deshacer', 'redo': 'rehacer', 'code': 'código', 
                    'paragraph': 'párrafo', 'route': 'ruta', 'height': 'alto', 'width': 'ancho', 'responsive': 'responsive', 'options': 'opciones', 'caption': 'leyenda', 'align': 'alinear', 'done': 'aceptar', 'moreFormats': 'formatos adicionales (separados por comas)' },
              
              'eng': { 'colors': 'colors', 'colors-bk': 'background color', 'bold': 'bold', 'italic': 'italic', 'underline': 'underline', 'smallCaps': 'small caps', 'strikeThrough': 'strike through', 'header': 'headers',
                    'subscript': 'subscript', 'superscript': 'superscript', 'justifyLeft': 'justify left', 'justifyCenter': 'justify center', 'justifyRight': 'justify right', 'justifyFull': 'justify full', 'insertOrderedList': 'insert ordered list', 'insertUnorderedList': 'insert unordered list',
                    'table': 'table', 'link': 'link', 'unlink': 'unlink', 'img': 'picture', 'filmstrip': 'video', 'smile': 'smile', 'div': 'sep', 'removeFormat': 'remove format', 'undo': 'undo', 'redo': 'redo', 'code': 'code', 
                    'paragraph': 'paragraph', 'route': 'route', 'height': 'height', 'width': 'width', 'responsive': 'responsive', 'options': 'options', 'caption': 'caption', 'align': 'align', 'done': 'done', 'moreFormats': 'moreFormats' }
  };

  function EditorMM( element, options ) {
      this.element = element;
      this.options = $.extend( {}, defaults, options) ;
      this.name = editorMM;
      this.init();        
  }

  EditorMM.prototype = {

    init: function() {

      this.options.buttons = this.toolbarOptions(this.options);
      this.toolbarInsert(this.element, this.options);
      this.toolbarBind(this.element, this.options);
      this.generalBind(this.element, this.options);

    }, /*#init */

    toolbarOptions: function(options) {

      var buttons = [];
      for (var i=0, len=options.buttons.length; i<len; i++) {
        buttons.push( {'action':options.buttons[i], 'title':lang[options.lang][options.buttons[i]] });
      };
      return buttons;

    }, /*#toolbarOptions */

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

          else if ( options.buttons[i].action == "link" ) {
            stringToolbar += "<div class='toolbarCommonPanel linkPanel'>";
            stringToolbar += "<input type='text' class='inputsToolbar inputWithIcon js-inputLink' placeholder='www.url.com'>";
            stringToolbar += "<span class='iconInput success icon-success submitLink'></span>"; 
            stringToolbar += "</div>";
          }

          else if ( options.buttons[i].action == "img" ) {
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

          else if ( options.buttons[i].action == "filmstrip" ) {
            stringToolbar += "<div class='toolbarCommonPanel videoPanel'>";
            stringToolbar += "<p><input type='text' name='js-inputRoute' class='inputsToolbar js-inputRoute inputLin' placeholder=''><label for='js-inputRoute'>"+lang[options.lang].route+"</label></p>";
            stringToolbar += "<p><input type='text' name='js-inputWidth' class='inputsToolbar js-inputWidth inputLin' placeholder='ie, 100px / 100%'><label for='js-inputWidth'>"+lang[options.lang].width+"</label></p>";
            stringToolbar += "<p><input type='text' class='inputsToolbar js-inputHeight inputLin' placeholder='ie, 100px / 100%'><label for='js-inputWidth'>"+lang[options.lang].height+"</label></p>";
            stringToolbar += "<p><input type='checkbox' class='js-inputResponsive'> "+lang[options.lang].responsive+"</p>";
            stringToolbar += "<p class='moreOptions'>+</p>";
            stringToolbar += "<div class='js-videoSuboptions' style='display:none;'>";
            stringToolbar += "<p>"+lang[options.lang].moreFormats+"</p>";
            stringToolbar += "<p><input type='text' name='js-inputFormats' class='inputsToolbar js-inputFormats inputLin' placeholder='ie: webm, mp4, ogg'></p>";
            stringToolbar += "<p><label>"+lang[options.lang].align+"</label><span class='checkIcon icon-justifyLeft js-alignVideo' data-float='left'></span><span class='checkIcon icon-justifyCenter js-alignVideo' data-float='center'></span><span class='checkIcon roundButton icon-justifyRight js-alignVideo' data-float='right'></span></p>";
            stringToolbar += "</div>";
            stringToolbar += "<p style='text-align:center;' class='js-submitVideo'><button class='buttonDone'>"+lang[options.lang].done+"</button></p>";
            stringToolbar += "</div>";
          }

          else if ( options.buttons[i].action == "smile" ) {
            stringToolbar += "<div class='toolbarCommonPanel smilePanel'>";
            for ( var s=0; s < 39; s++ ) {
              stringToolbar += "<img src='icons/"+s+".png' width='24' height='24' class='js-smile'>";                  
            }
            stringToolbar += "</div>";
          }

          else if ( options.buttons[i].action == "colors" ) {
            stringToolbar += "<div class='toolbarCommonPanel colorsPanel'>";
              for ( var d=0, led = options.colors.length; d<led; d++) {
                  stringToolbar += "<div class='colorsTile js-optionColor' style='background:#"+options.colors[d]+"' data-color="+options.colors[d]+"></div>";
              } 
            stringToolbar += "</div>";
          }

          else if ( options.buttons[i].action == "colors-bk" ) { /* Quizás debería unificarlo con la anterior... ver más adelante. todo */
            stringToolbar += "<div class='toolbarCommonPanel colorsPanel'>";
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
      stringDivEditable = "<div id='editor-mm' class='editor-mm' contenteditable='true' style='width:"+options.style.width+"'>"+ $(el).val()+"</div>";
      
      $(el).before(stringToolbar+stringDivEditable).hide();
      stringToolbar = stringDivEditable = null;

    }, /* #toolbarInsert */

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
          case "removeFormat":
          case "undo":
          case "redo":              
          case "unlink":      
            document.execCommand(this.action, false, null);
          break;
          case "link":
            self.linkButton($(this));
          break;
          case "colors-bk":
            self.bkcolorButton($(this));
          break;
          case "colors":
            self.colorButton($(this));
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
          case "filmstrip":
            self.videoButton($(this));
          break;
          case "smile":
            self.smileButton($(this));
          break;
          case "code":         
            self.showCodeButton(el);
          break;
        }
      });

    }, /* #toolbarBind */

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

    }, /* #nodeButton */

    headerButton: function(button) {        
      var self          = this;
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

    linkButton: function(button) {
      var self        = this;
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
        linkPanel.css('left', button.position().left).slideDown(600);           
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

    videoButton: function(button) {
      var self            = this;
      var videoPanel      = button.next('.videoPanel');          
      var inputRoute      = videoPanel.find('.js-inputRoute');
      var inputHeight     = videoPanel.find('.js-inputHeight');
      var inputWidth      = videoPanel.find('.js-inputWidth');
      var inputResponsive = videoPanel.find('.js-inputResponsive');          
      var inputFormats    = videoPanel.find('.js-inputFormats');
      var alignVideo      = videoPanel.find('.js-alignVideo');
      var moreOptions     = videoPanel.find('.moreOptions');
      var submitVideo     = videoPanel.find('.js-submitVideo');
      var vidSuboptions   = videoPanel.find('.js-videoSuboptions');
      var selObj          = null;
      var newNode         = null; 
      var selRange        = null;
      var stringVideo     = null;
      
      function unbindButton() {
        videoPanel.slideUp(600).removeClass('js-active'); 
        button.removeClass('js-active');
        inputResponsive.unbind('click').prop('checked', false);
        moreOptions.unbind('click').text('+');            
        submitVideo.unbind('click');
        alignVideo.unbind('click');
        inputRoute.val('');
        inputHeight.val('');
        inputWidth.val('');
        inputFormats.val('');
        vidSuboptions.css('display','none');
        alignVideo.removeClass('js-active').removeClass('success');
        selObj = newNode = selRang = stringVideo = null;
      }
      
      selObj = self.getSelection();          
      if ( selObj.type != 'None' ) {
        selRange = selObj.getRangeAt(0);
      }
      
      if ( button.hasClass('js-active') ) {
        unbindButton();

      } else {
        videoPanel.css('left', button.position().left).slideDown(600);
        button.addClass('js-active');
       
        inputResponsive.click(function() {
          if ( $(this).prop('checked') ) {
            inputWidth.val('100%');
            inputHeight.val('auto');
          }              
        });

        moreOptions.click(function() {
          if ( $(this).hasClass('js-active') ) {
            vidSuboptions.slideUp('fast', function() {
              moreOptions.text('+').removeClass('js-active');
            });
          } else {
            vidSuboptions.slideDown('fast', function() {
              moreOptions.text('-').addClass('js-active');
            });
          }
        });

        alignVideo.click(function() {              
          if ( $(this).hasClass('js-active') ) {
            $(this).removeClass('js-active').removeClass('success');
          } else {
            alignVideo.removeClass('js-active').removeClass('success');
            $(this).addClass('js-active').addClass('success');
          }
        });

        submitVideo.click(function() {
          var temp, formatMain;
          if( selRange !== null ) {
            self.restoreSelection(selRange);
            temp = vidSuboptions.find('.js-active').attr('data-float');

            if ( temp == 'left' ) {
              temp = "style='float:left;'";
            } else if ( temp == 'right' ) {
              temp = "style='float:right;'";
            } else if ( temp == 'center' ) {
              temp = "style='margin: 0 auto; text-align:center;'";
            } else {
              temp = "";
            }

            formatMain = inputRoute.val();

            if ( formatMain && formatMain.indexOf('.') != -1 ) {
              formatMain = formatMain.split('.').pop();
              stringVideo = "<video width='"+inputWidth.val()+"' height='"+inputHeight.val()+"' controls "+temp+">";
              stringVideo += "<source src='"+inputRoute.val()+"' type='video/"+formatMain+"'>";
              if ( inputFormats.val() ) {
                temp = inputFormats.val().split(',');
                for ( var i=0, len=temp.length; i<len; i++ ) {
                  if ( temp[i] != formatMain ) {
                    stringVideo += "<source src='"+inputRoute.val().replace(formatMain, temp[i].trim() )+"' type='video/"+temp[i].trim()+"'>";
                  }
                }
              }
              stringVideo += "Your browser does not support the video tag.",
              stringVideo += "</video>";
              self.insertHtmlAfterSelection(stringVideo);
            }
                            
          }          
          unbindButton();            
        });
      }

    }, /* #videoButton */


    imgButton: function(button) {
      var self            = this;
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
        imgPanel.css('left', button.position().left).slideDown(600);
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

    smileButton: function(button) {
      var self        = this;
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
        smilePanel.css('left', button.position().left).slideDown(600);
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

    colorButton: function(button) {
      var self          = this;;
      var colorPanel    = button.next('.colorsPanel');
      var optionColor   = colorPanel.find('.js-optionColor')
      var selObj        = null;
      var atribute      = null;
      var selRange      = null;

      function unbindButton() {
        colorPanel.slideUp(600);
        button.removeClass('js-active');
        optionColor.unbind('click');
        colorPanel = optionColor = selObj = atribute = selRange;
      }

      selObj = self.getSelection();          
      if ( selObj.type != 'None' ) {
        selRange = selObj.getRangeAt(0);
      }

      if ( button.hasClass('js-active') ) {
        unbindButton();

      } else {
        colorPanel.css('left', button.position().left).slideDown(600);
        button.addClass('js-active');
        optionColor.click(function() {
          if(selRange !== null ) {
            self.restoreSelection(selRange);
            /* Esto genera un tag font, deprecated.... ver con calma */
            document.execCommand('styleWithCSS', false, true);
            document.execCommand("foreColor",false,"#"+$(this).attr('data-color') );
            //atribute = "color:#"+$(this).attr('data-color')+";"                
            //self.nodeButton("span", atribute);
          }
          unbindButton();            
        });
      }
    }, /* #colorButton */

    bkcolorButton: function(button) { /* todo. Unificar con la anterior */

      var self          = this;
      var colorPanel    = button.next('.colorsPanel');
      var optionColor   = colorPanel.find('.js-optionColor')
      var selObj        = null;
      var atribute      = null;
      var selRange      = null;

      function unbindButton() {
        colorPanel.slideUp(600);
        button.removeClass('js-active');
        optionColor.unbind('click');
        colorPanel = optionColor = selObj = atribute = selRange;
      }

      selObj = self.getSelection();          
      if ( selObj.type != 'None' ) {
        selRange = selObj.getRangeAt(0);
      }

      if ( button.hasClass('js-active') ) {
        unbindButton();

      } else {
        colorPanel.css('left', button.position().left).slideDown(600);
        button.addClass('js-active');
        optionColor.click(function() {
          if(selRange !== null ) {
            self.restoreSelection(selRange);
            /* Esto genera un tag font, deprecated.... ver con calma */
            //document.execCommand('styleWithCSS', false, true);
            document.execCommand("backColor",false,"#"+$(this).attr('data-color') );
            //atribute = "background:#"+$(this).attr('data-color')+";"                
            //self.nodeButton("span", atribute);
          }
          unbindButton();            
        });
      }
    }, /* #colorButton */

    showCodeButton: function(el) { 

      var textArea = $(el);
      var editor = textArea.prev('.editor-mm');
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

    }, /* #showCodeButton */

    getSelection: function() {

      if (window.getSelection) {
          return window.getSelection();
      } else {
          if (document.selection.createRange) {
              return document.selection.createRange();                        
          }
      }

    }, /* #getSelection */

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

    }, /* #restoreSelection */

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

              /* Range.createContextualFragment() would be useful here but is
              non-standard and not supported in all browsers (IE9, for one) */
              var el = document.createElement("div");
              el.innerHTML = html;
              var frag = document.createDocumentFragment(), node, lastNode;
              while ( (node = el.firstChild) ) {
                  lastNode = frag.appendChild(node);
              }
              range.insertNode(frag);

              /* Preserve the selection */
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

    }, /* #insertHtmlAfterSelection */

    generalBind: function(el, options) {
      var textArea = $(el);
      var editor = textArea.prev('.editor-mm');
      editor.blur(function() {
          textArea.val(editor.html());
      });

     $('.js-buttons').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
      });

      /* Todo: chrome bugs... */

      // $('.editor-mm').keydown(function(e) {
      //   console.log('jey')
      //   if (e.keyCode === 13) {
      //     document.execCommand('insertHTML', false, '<br><br>');
      //     return false;
      //   }
      // });

    } /* #generalBind */

  } /* #EditorMM.prototype */

  $.fn[editorMM] = function ( options ) {
      return this.each(function () {
          if (!$.data(this, "pEditorMM")) {
              $.data(this, "pEditorMM",
              new EditorMM( this, options ));
          }
      });
  };

})( jQuery, window, document );