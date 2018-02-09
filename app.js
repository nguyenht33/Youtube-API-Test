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
						<img src="${item.snippet.thumbnails.medium.url}">
						<a href ="https://www.youtube.com/watch?v=${item.id.videoId}">
							<h3>${item.snippet.title}</h3>
						</a>
						<p><i class="fas fa-user"></i>${item.snippet.channelTitle}<p>
				</div>`
	});	

	$('.js-search-results').html(content);

}

function nextPage() {
	$('.js-next-btn').click(function(e) {
		e.preventDefault();
		getNextVideos();
	});
}

function prevPage() {
	$('.js-prev-btn').click(function(e) {
		e.preventDefault();
		getPrevVideos();
	})
}

function getSearch() {
	$('.js-search-form').on('submit', function(e) {
		e.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		searchTerm = queryTarget.val();
		queryTarget.val("");
		getVideos(searchTerm);
	});
}

function getPopularVideo() {
	let data = {
		chart: 'mostPopular',
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

function init() {
	getPopularVideo();
	getSearch();
	nextPage();
	prevPage();
}

$(init)

