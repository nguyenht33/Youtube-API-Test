const URL = 'https://www.googleapis.com/youtube/v3/search';
const apiKey = 'AIzaSyBi1ASGYDx3zFG7w7PJamF99Gio-XcD5W4';
let searchTerm;
let nextPageToken;
let prevPageToken;


function getVideos() {
	let data = {
		q: searchTerm,
		part: 'snippet',
		maxResults: 24,                                                                       
		key: apiKey, 
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: 'json',
	  url: URL,
	  data: data,
	  success: displayResults
	});
} 

function getPopularVideo() {
	let data = {
		chart: 'mostPopular',
		part: 'snippet',
		maxResults: 24,
		order: 'date',                                                                       
		key: apiKey, 
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: 'json',
	  url: URL,
	  data: data,
	  success: displayResults
	});
}

function getMostRecent() {
	let data = {
		q: searchTerm,
		part: 'snippet',
		maxResults: 24,                                                                       
		key: apiKey,  
		order: 'date',
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: "json",
	  url: URL,
	  data: data,
	  success: displayResults
	});
}

function getMostViewed() {
	let data = {
		q: searchTerm,
		part: 'snippet',
		maxResults: 24,                                                                       
		key: apiKey,  
		order: 'viewCount',
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: "json",
	  url: URL,
	  data: data,
	  success: displayResults
	});
}

function getBestRated() {
	let data = {
		q: searchTerm,
		part: 'snippet',
		maxResults: 24,                                                                       
		key: apiKey,  
		order: 'rating',
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: "json",
	  url: URL,
	  data: data,
	  success: displayResults
	});
}

function getNextVideos() {
	let data = {
		q: searchTerm,
		part: 'snippet',
		maxResults: 24,                                                                       
		key: apiKey,  
		pageToken: nextPageToken, 
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: "json",
	  url: URL,
	  data: data,
	  success: displayResults
	});
}

function getPrevVideos() {
	let data = {
		q: searchTerm,
		part: 'snippet',
		maxResults: 24,                                                                       
		key: apiKey,  
		pageToken: prevPageToken, 
		type: 'video'
	}
                                     
	$.ajax({                                                                   
	  dataType: "json",
	  url: URL,
	  data: data,
	  success: displayResults
	});
}

function displayResults(results) {
	nextPageToken = results.nextPageToken;
	prevPageToken = results.prevPageToken;

	let content = results.items.map(function(item) {
		return `<div class="thumbnail-box">
					<div class="img-box">
						<img src="${item.snippet.thumbnails.medium.url}" class="lightbox-trigger thumbnail-img" id="${item.id.videoId} alt="click to play video in lightbox">
						<div class="overlay-box">
							<div class="play-overlay lightbox-trigger">
								<a href="#"><i class="far fa-play-circle fa-5x"></i></a>
							</div>
						</div>
					</div>
					<a href ="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
					<h3>${item.snippet.title}</h3>
					</a>
					<a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">
					<p><i class="fas fa-user"></i>${item.snippet.channelTitle}<p>
					</a>
				<div>`
	});

	$('.js-search-results').html(content);

	$('img').on('load', function() {
		$('.loader').removeClass('loading-img');
	});
}

function pageHandler() {
	$('.js-next-btn').click(function(e) {
		e.preventDefault();
		getNextVideos();
	});

	$('.js-prev-btn').click(function(e) {
		e.preventDefault();
		getPrevVideos();
	});
}

function filterHandler() {
	$('.filter-video').change(function(e) {
		e.preventDefault();
		const filter = $('.filter-video').val()
		if (filter === 'recent') {
			getMostRecent();
		} else if (filter === 'rating') {
			getBestRated();
		} else if (filter === 'viewCount') {
			getMostViewed();
		} else {
			getVideos();
		}
	});
}

function filterStatus() {
	const filter = $('.filter-video').val()
	if (filter === 'recent') {
		getMostRecent();
	} else if (filter === 'rating') {
		getBestRated();
	} else if (filter === 'viewCount') {
		getMostViewed();
	} else {
		getVideos();
	}
}

function getSearch() {
	$('.js-search-form').on('submit', function(e) {
		e.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		searchTerm = queryTarget.val();
		queryTarget.val("");
		filterStatus();
	});
}

function lightBox() {
	$('main').on('click', '.lightbox-trigger', function(e) {
		e.preventDefault();
		let videoId = $(this).attr('id');
		let videoContent = 
			`<div class="lightbox">
				<p>X</p>
				<div class="videobox">
					<iframe src="http://www.youtube.com/embed/${videoId}autoplay=1" width="960" height="447" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>`;
		let video = `<iframe src="http://www.youtube.com/embed/${videoId}autoplay=1" width="960" height="447" frameborder="0" allowfullscreen></iframe>`

		if ($('.lightbox').length > 0) {
			$('.videobox').html(video);
			$('.lightbox').show('fast');
		} else {
			$('body').append(videoContent);
		}
	});
	closeBox();
}

function closeBox() {
	$('body').on('click', '.lightbox', function() {
		$('.lightbox').hide();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.lightbox').hide();
		}
	});
}

function init() {
	getPopularVideo();
	getSearch();
	pageHandler();
	filterHandler();
	lightBox();
}

$(init)

