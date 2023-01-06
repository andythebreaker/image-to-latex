#!/usr/bin/env node

"use strict";
var cmd = require('node-cmd');
var commandExists = require('command-exists');
var commandExists2 = require('command-exists');
var shell = require('shelljs');
const termkit = require('terminal-kit');
const term = termkit.terminal;
const path = require('path');
var fs = require('fs');
const chromafi = require('chromafi');
var currentDir = require('current-dir');
const { dateId, intId, base62Id } = require('@tanayshandilya/unique-id');
var to = require('to-case');
/*
if ( process.argv.length <= 2 ) {
	term.magenta( "Usage is: ./%s <file-path> [-m] [<max-scale>]\n" , path.basename( process.argv[ 1 ] ) ) ;
	term.gray( "-m: load inside a ScreenBuffer and interactively move the image\n" ) ;
	process.exit( 1 ) ;
}
*/

var reg_array_ze = "";

var screen, image, filler, move, maxScale, SB;//,
//	url = process.argv[ 2 ] ;

if (term.support['24bitsColors']) {
	SB = termkit.ScreenBufferHD;
	filler = {
		attr: {
			color: { r: 0, g: 0, b: 0 },
			bgColor: { r: 0, g: 0, b: 0 }
		}
	};
}
else {
	SB = termkit.ScreenBuffer;
	filler = {
		attr: {
			color: 'black',
			bgColor: 'black',
		}
	};
}


// Can't depend on minimist just for a sample code, so we had to parse the command line by ourself
if (process.argv[3] === '-m') {
	move = true;
	maxScale = process.argv[4] || 2;
}
else {
	if (process.argv[4] === '-m') {
		move = true;
		maxScale = process.argv[3] || 2;
	}
	else {
		move = false;
		maxScale = process.argv[3] || 1;
	}
}



if (!move) {
	term.drawImage( /*url*/"./icon.jpg", {
		shrink: {
			width: term.width * maxScale,
			height: (term.height - 1) * 2 * maxScale
		}
	});
	term.slowTyping(
		'\n',	//'masterSlaveTTParchivingRadio\n',
		{ flashStyle: term.brightWhite },
		function () {
			term.table([
				['標題', 'image2latex', '電阻辨識'],
				['原始路徑', '梅莉', 'aa09...'],
				['雲端資料庫', '...', '...'],
				['雲端輸出', 'smallyu1148@gmail.com', 'https://drive.google.com/drive/folders/1D2FelXh3dnOvavbGJkDMpO3rAUu-U4gw?usp=share_link'],
			], {
				hasBorder: true,
				contentHasMarkup: true,
				borderChars: 'lightRounded',
				borderAttr: { color: 'orange' },
				textAttr: { bgColor: 'default' },
				//firstCellTextAttr: { bgColor: 'orange' },
				//firstRowTextAttr: { bgColor: 'orange' },
				//firstColumnTextAttr: { bgColor: 'orange' },
				width: 60,
				fit: true   // Activate all expand/shrink + wordWrap
			}
			);
			commandExists('python', function (err, commandExists) {
				if (commandExists) {
					// proceed confidently knowing this command is available
					term.table([
						['您的系統可以使用', 'python', '指令']
					], {
						hasBorder: false,
						contentHasMarkup: true,
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'blue' },
						firstRowTextAttr: { bgColor: 'yellow' },
						firstColumnTextAttr: { bgColor: 'red' },
						checkerEvenCellTextAttr: { bgColor: 'gray' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
				} else {
					commandExists2('python3', function (err, commandExists) {
						if (commandExists) {
							// proceed confidently knowing this command is available
							term.table([
								['您的系統可以使用', 'python3', '指令']
							], {
								hasBorder: false,
								contentHasMarkup: true,
								textAttr: { bgColor: 'default' },
								firstCellTextAttr: { bgColor: 'blue' },
								firstRowTextAttr: { bgColor: 'yellow' },
								firstColumnTextAttr: { bgColor: 'red' },
								checkerEvenCellTextAttr: { bgColor: 'gray' },
								width: 60,
								fit: true   // Activate all expand/shrink + wordWrap
							}
							);
						} else {

							//--
							term.table([
								['您的系統不可以使用', 'python', '指令'],
								['您的系統不可以使用', 'python3', '指令']
							], {
								hasBorder: true,
								contentHasMarkup: true,
								borderChars: 'lightRounded',
								borderAttr: { color: 'blue' },
								textAttr: { bgColor: 'default' },
								firstCellTextAttr: { bgColor: 'blue' },
								firstRowTextAttr: { bgColor: 'yellow' },
								firstColumnTextAttr: { bgColor: 'red' },
								width: 60,
								fit: true   // Activate all expand/shrink + wordWrap
							}
							);
						}
						question();
						//question();
					});
					//--
					/*term.table([
						['您的系統不可以使用', 'python', '指令']
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'blue' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'blue' },
						firstRowTextAttr: { bgColor: 'yellow' },
						firstColumnTextAttr: { bgColor: 'red' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);*/
				}
			});

			question();
			//	process.exit() ; 
		}
	);


	return;
}

function question() {
	/*term('Do you like javascript? [Y|n]\n');

	// Exit on y and ENTER key
	// Ask again on n
	term.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, function (error, result) {

		if (result) {
			term.green("'Yes' detected! Good bye!\n");
			process.exit();
		}
		else {
			term.red("'No' detected, are you sure?\n");
			question();
		}
	});*/
	term.cyan('這是主目錄:(請選擇功能並按下enter進入；使用方向鍵)\n');
	//var items = fs.readdirSync( process.cwd() ) ;
	term.gridMenu(//singleColumnMenu(
		[
			'首次使用',
			'使用說明',
			'[請讀!]訓練說明',
			'源資料標籤備份',
			'[預檢視]源資料標籤「array」化',
			'[寫入檔案]源資料標籤「array」化',
			'隨機分配',
			'檢視標籤',
			'檢視訓練文件',
			'檢視測試文件',
			'檢視驗證文件',
			'檢視資料路徑',
			'檢視目前(工作)路徑',
			'離開',
		]
		/*items*/, function (error, response) {

			term('\n').eraseLineAfter.green(
				"#%s selected: %s (%s,%s)\n",
				response.selectedIndex,
				response.selectedText,
				response.x,
				response.y
			);
			var paths_of_data_doc = [
				'data/im2latex_formulas.norm.new.lst', 'data/im2latex_train_filter.lst', 'data/im2latex_test_filter.lst',
				'data/im2latex_validate_filter.lst', 'data/formula_images_processed'
			];
			switch (response.selectedText) {
				case '隨機分配':
					term.cyan('我們的資料池總共有以下這麼多筆:\n');
					cmd.run(
						`cat ${paths_of_data_doc[0]} | wc -l`,
						function (err, data, stderr) {
							console.log('data : ', data);
							console.log('err : ', err);
							console.log('stderr : ', stderr);
							if (!err && !stderr) {
								term.cyan(`數字化:${Number(data)};\n`);
							}
							question();
						}
					);

					break;
				case '[請讀!]訓練說明':
					term.table([
						['python 環境', '這個repo根目錄', 'venv'],
						['cuda機器', '提示本機', '後面2、5號機'],
						['訓練指令', 'python', 'scripts/run_experiment.py'],
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					question();
					break;
				case '[預檢視]源資料標籤「array」化':
					fs.readFile(paths_of_data_doc[0], 'utf8', (err, data1) => {
						if (err) {
							console.error(err);
							return;
						}
						console.log(data1);

						const regex1 = /./gm;

						// Alternative syntax using RegExp constructor
						// const regex = new RegExp('.', 'gm')

						const str1 = to.upper(data1);
						const subst1 = `$&\ `;

						// The substituted value will be contained in the result variable
						const result1 = str1.replace(regex1, subst1);

						console.log('Substitution result: \n', result1);

						reg_array_ze = result1;
						question();
					});
					break;
				case '[寫入檔案]源資料標籤「array」化':
					shell.rm(paths_of_data_doc[0]);
					fs.writeFile(paths_of_data_doc[0], reg_array_ze, function (err) {
						if (err) return console.log(err);
						term.table([
							['檔案寫回(長度)', paths_of_data_doc[0], reg_array_ze.length]
						], {
							hasBorder: true,
							contentHasMarkup: true,
							borderChars: 'lightRounded',
							borderAttr: { color: 'Magenta' },
							textAttr: { bgColor: 'default' },
							firstCellTextAttr: { bgColor: 'Magenta' },
							firstRowTextAttr: { bgColor: 'Magenta' },
							firstColumnTextAttr: { bgColor: 'Magenta' },
							width: 60,
							fit: true   // Activate all expand/shrink + wordWrap
						}
						);
						question();
					});
					break;
				case '檢視目前(工作)路徑':
					term.table([
						['目前(工作)路徑', ':', currentDir()]
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					question();
					break;
				case '首次使用':
					term.table([
						['python環境', 'conda', 'p37'],
						['拿取資料', '安裝', 'pip install clearml'],
						['clearml', '設定', 'clearml-init'],
						['clearml', '初期更多資訊', 'https://clear.ml/docs/latest/docs/getting_started/ds/ds_first_steps/'],
						['放資料的地方', '只是一個暫存的地方', 'mkdir clearml'],
						['從clearml拿資料', 'clearml-data get --id 9b11fab29bdd452ea845d7962b5598aa --copy ./a/place/new/dir', 'https://app.clear.ml/projects/9bbe37aa47954116b24b93afc75bd706/experiments/ad054f193fb9444694356388b51f9162/output/execution'],
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					question();
					break;
				case '使用說明':
					term.table([
						['tui', '是甚麼?', '一個輔助的程式；讓使用者方便下指令的terminal user interface'],
						['tui.js', '程式主進入點', '找關鍵字slow'],
						['tui.js', '選項的code行', '找關鍵字switch'],
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					question();
					break;
				case '檢視資料路徑':
					term.table([
						['標籤們', ':', paths_of_data_doc[0]],
						['train文件', ':', paths_of_data_doc[1]],
						['test文件', ':', paths_of_data_doc[2]],
						['val文件', ':', paths_of_data_doc[3]],
						['圖片們', ':', paths_of_data_doc[4]],
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					question();
					break;
				case '檢視標籤':
					console.log(chromafi(shell.cat(paths_of_data_doc[0])));
					question();
					break;
				case '檢視訓練文件':
					console.log(chromafi(shell.cat(paths_of_data_doc[1])));
					question();
					break;
				case '檢視測試文件':
					console.log(chromafi(shell.cat(paths_of_data_doc[2])));
					question();
					break;
				case '檢視驗證文件':
					console.log(chromafi(shell.cat(paths_of_data_doc[3])));
					question();
					break;
				case '源資料標籤備份':
					var name_bk = dateId();
					shell.mkdir(name_bk);
					shell.cp('data/*lst', name_bk);
					shell.ls(name_bk).forEach(function (filetodo) {
						term.brightMagenta(filetodo + '\n');
					});
					question();
					break;
				case '離開':
					term.table([
						['離開', '將關閉', '...']
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					process.exit();
					break;

				default:
					break;
			}
			//process.exit();
		});
}

//question() ;

async function loadImage() {
	image = await SB.loadImage(
		url,
		{
			terminal: term,
			shrink: { width: term.width * maxScale, height: (term.height - 1) * 2 * maxScale }
		}
	);

	screen = SB.create({ dst: term, height: term.height - 1, noFill: true });
	screen.y = 2;

	image.dst = screen;

	term.clear();
	term.grabInput();
	term.hideCursor();

	term.on('key', (key, matches, data) => {

		var offset, stats;

		switch (key) {
			case 'UP':
				offset = Math.round(term.height / 20);
				screen.vScroll(offset, true);	// Perform term.scrollDown()
				image.y += offset;
				image.draw();
				stats = screen.draw({ delta: true });	// This only redraws new lines on the top
				//console.error( stats ) ;
				break;
			case 'DOWN':
				offset = Math.round(term.height / 20);
				screen.vScroll(- offset, true);	// Perform term.scrollUp()
				image.y += - offset;
				image.draw();
				stats = screen.draw({ delta: true });	// This only redraws new lines on the bottom
				//console.error( stats ) ;
				break;
			case 'LEFT':
				offset = Math.round(term.width / 20);
				image.x += offset;
				redraw();
				break;
			case 'RIGHT':
				offset = Math.round(term.width / 20);
				image.x -= offset;
				redraw();
				break;
			case 'q':
			case 'CTRL_C':
				terminate();
				break;
		}
	});

	redraw();
	term.moveTo(1, 1).bgWhite.blue.eraseLineAfter("Arrows keys: move   Q/CTRL-C: quit");
}


function redraw() {
	var stats;

	screen.fill(filler);
	image.draw();
	stats = screen.draw({ delta: true });
	//console.error( stats ) ;
}



function terminate() {
	term.hideCursor(false);
	//term.applicationKeypad( false ) ;
	term.styleReset();
	term.resetScrollingRegion();
	term.moveTo(term.width, term.height);
	term('\n');
	term.processExit();
}



loadImage();
