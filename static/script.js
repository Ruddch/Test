var app = {
	checkTimer: function() {
		var timers = document.querySelectorAll('.rest-timer');
		for (var i=0; i<timers.length; i++) {
			var time = timers[i].getAttribute('data-rest');
			if (time != 0) {
				app.startTimer(time, timers[i].parentNode);
			}
		}
	},

	startTimer: function(time, node) {
		node.classList.add('disable');

		var lastTime = Date.now()
		var date = new Date(null);

		var loop = function() {
			var timeLess = time - Math.round((Date.now() - lastTime) / 1000);
			if (timeLess <= 0) {
				clearInterval(timer);
				node.classList.remove('disable');
				node.querySelector('span').innerHTML = '';
				return
			};
			date.setTime((timeLess * 1000 + date.getTimezoneOffset()*60000));
			node.querySelector('span').innerHTML = date.toLocaleString().substr(12).replace( /^0:00:|^0:/, "" );
		};

		loop();
		var timer = setInterval( function() {
			loop();
		}, 1000);
	},

	handlerClick: function(event) {
		var target = event.target;
		while (target != this) {
			if (target.getAttribute('data-id')) {
				app.checkElem(target);
				return;
			}
			target = target.parentNode;
		}
	},

	checkElem: function(node) {
		if (node.classList.contains('disable')) return;
		app.sendRequest(node)
	},

	sendRequest: function(node) {
		var validResponse = {
			status: 'ok'
		}
		var xhr = new XMLHttpRequest();
		var url = 'url?' + node.getAttribute("data-id")
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200 || xhr.responseText != JSON.stringify(validResponse) ) {
				// error message
			} else {
				var time = node.getAttribute("data-recovery");
				var point = node.getAttribute("data-point");
				app.startTimer(time, node);
				app.updateScore(point);
			}
		}
		xhr.send();
	},

	updateScore: function(point) {
		var score = +document.querySelector('.score-field span').innerHTML;
		score += +point;
		document.querySelector('.score-field span').innerHTML = score;
	},

	unit: function() {
		document.querySelector('.item-list').addEventListener('click', app.handlerClick);
		app.checkTimer();
	},
};

app.unit();
