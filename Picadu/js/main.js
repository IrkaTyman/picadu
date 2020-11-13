const firebaseConfig = {
      apiKey: "AIzaSyCmiudbL1UxQ2IWXUkG4JZ2zo3o9i1VwcA",
      authDomain: "glo-academy-pikadu.firebaseapp.com",
      databaseURL: "https://glo-academy-pikadu.firebaseio.com",
      projectId: "glo-academy-pikadu",
      storageBucket: "glo-academy-pikadu.appspot.com",
      messagingSenderId: "758265150860",
      appId: "1:758265150860:web:64a735d62a0d37a4b96aa9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase)

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const loginElem = document.querySelector('.login'),
	  loginForm = document.querySelector('.login-form'),
      emailInput= document.querySelector('.login-email'),
	  passwordInput= document.querySelector('.login-password'),
	  loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user'),
	  userNameElem = document.querySelector('.user-name');

const regExpValidEmail= /^\w+@\w\.{2,}$/;
const exitElem= document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem= document.querySelector('.add-post');
const listUsers = [
	{		
		id: '01',
		email:'tymanira@mail.ru',
		password: 'fufufulalala',
		displayName: 'Irinka',
		photo: 'https://www.rosphoto.com/images/u/articles/1510/7_5.jpg',
	},

	{
		id: '02',
		email:'irinka@mail.ru',
		password: '111111',
		displayName: 'Irusha',
		photo: 'img/avatar.jpeg'
	},
];

const setUsers = {
	user:null,
	logIn(email,password, handler){
		const user = this.getUser(email);
		if(user.password == password){
			this.authorizedUser(user);
			handler();
		} else {
			alert("Пользователь с такими данными не найден")
		}
	},

	logOut(handler){
		this.user = null;
		handler();
	},

	signUp(email,password, handler){

		if(!email.trim() || !password.trim()){
			alert('Введите данные');
			return;
		};

		if(!this.getUser(email) ){
			const displayName = email.split('@')[0];
			const user = {email,password,displayName:email.substring(0,email.indexOf('@')),photo: 'img/avatar.jpeg'}
			listUsers.push(user);
			this.authorizedUser(user);
			handler();
		} else {
			alert('Пользователь с таким email уже зарегистрирован');
		}
	},

	getUser(email){
		return listUsers.find(item=>item.email === email);
	},

	authorizedUser(user){
		this.user = user;
	},

	editUser(username,photoURL = '', handler){
		let prevName = this.user.displayName;
		if(username){
			this.user.displayName = username;
		}
		if(photoURL){
			this.user.photo = photoURL;
		}
		
		changeInAllPost(prevName);
		handler();

	},

};

const setPosts = {

	allPosts: [
		{
			title: 'Заголовок  поста',
			text: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот
	            маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему
	            букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его
	            снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую
	            подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что
	            вопроса ведущими о решила одна алфавит! `,
	        tags: ['свежее','новое','горячее','мое','случайность'],
	        author: {displayName:'Irinka',photo:'https://www.rosphoto.com/images/u/articles/1510/7_5.jpg'},
	        date:'11.11.2020, 20:54:00',
	        like: 15,
	        comments:20,
		},
		{
			title: 'Заголовок  поста',
			text: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот
	            маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему
	            букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его
	            снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую
	            подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что
	            вопроса ведущими о решила одна алфавит! `,
	        tags: ['свежее','горячее','мое','случайность'],
	        author:  {displayName:'Irinka',photo:'img/avatar.jpeg'},
	        date:'11.11.2020, 20:53:00',
	        like: 102,
	        comments:50,
		},
		{
			title: 'Заголовок  поста',
			text: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот
	            маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему
	            букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его
	            снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую
	            подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что
	            вопроса ведущими о решила одна алфавит! `,
	        tags: ['свежее','горячее','мое','курорт','случайность'],
	        author:  {displayName:'Irinka',photo:'https://www.rosphoto.com/images/u/articles/1510/7_5.jpg'},
	        date:'11.11.2020, 20:53:00',
	        like: 102,
	        comments:50,
		},
	],

	addPost(title, text, tags, handler){
		this.allPosts.unshift({title,
							   text,
							   tags: tags.split(',').map(item => item.trim()), 
							   author:{
							    	displayName:setUsers.user.displayName,
							    	photo:setUsers.user.photo
							   }, 
							   date: new Date().toLocaleDateString(), 
							   like:0, 
							   comments:0
		});

		if(handler){
			handler();
		};

	},
};

const changeInAllPost = (prevName) => {
	let user = setUsers.user;
	setPosts.allPosts.forEach(post => {
		if (post.author.displayName == prevName){
			post.author = {displayName:user.displayName, photo: user.photo}
		};
	})

}

const toggleAuthDom = () => {
	const user = setUsers.user;
	console.log(user);
	console.log(user)
	if(user){
		loginElem.style.display = 'none';
		userElem.style.display = 'flex';
		userNameElem.textContent = user.displayName;
		userAvatarElem.src = user.photo || userAvatarElem.src;
		buttonNewPost.classList.add('visible');

	} else {
		loginElem.style.display = 'flex';
		userElem.style.display = 'none';
		buttonNewPost.classList.remove('visible');
		addPostElem.classList.remove('visible');
		postsWrapper.classList.add('visible');
	};
};

const showAddPosts = () => {
	addPostElem.classList.add('visible');
	postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {

	addPostElem.classList.remove('visible');
	postsWrapper.classList.add('visible');

	let postsHTML = '';

	setPosts.allPosts.forEach(post => {
		postsHTML += `
		<section class="post">
	        <div class="post-body">
	          <h2 class="post-title">${post.title}</h2>
	          <p class="post-text">${post.text} </p>
	          
	          <div class="tags">
	          	${post.tags.map((tag)=>{
	          		return ('<a href="#" class="tag">#'+ tag + '</a>')}
	          	).join('')}
	          </div>
	          <!-- /.tags -->
	        </div>
	        <!-- /.post-body -->
	        <div class="post-footer">
	          <div class="post-buttons">
	            <button class="post-button likes">
	              <svg width="19" height="20" class="icon icon-like">
	                <use xlink:href="img/icons.svg#like"></use>
	              </svg>
	              <span class="likes-counter">${post.like}</span>
	            </button>
	            <button class="post-button comments">
	              <svg width="21" height="21" class="icon icon-comment">
	                <use xlink:href="img/icons.svg#comment"></use>
	              </svg>
	              <span class="comments-counter">${post.comments}</span>
	            </button>
	            <button class="post-button save">
	              <svg width="19" height="19" class="icon icon-save">
	                <use xlink:href="img/icons.svg#save"></use>
	              </svg>
	            </button>
	            <button class="post-button share">
	              <svg width="17" height="19" class="icon icon-share">
	                <use xlink:href="img/icons.svg#share"></use>
	              </svg>
	            </button>
	          </div>
	          <!-- /.post-buttons -->
	          <div class="post-author">
	            <div class="author-about">
	              <a href="#" class="author-username">${post.author.displayName}</a>
	              <span class="post-time">${post.date}</span>
	            </div>
	            <a href="#" class="author-link"><img src=${post.author.photo || 'img/avatar.jpeg'} alt="avatar" class="author-avatar"></a>
	            
	          </div>
	          <!-- /.post-author -->
	        </div>
        	<!-- /.post-footer -->
      	</section>
		`;
	})

	postsWrapper.innerHTML = postsHTML;

}



const init= () =>{
	// отслеживаем клик по кнопке меню и запускаем функцию 
	menuToggle.addEventListener('click', function (event) {
	  // отменяем стандартное поведение ссылки
	  event.preventDefault();
	  // вешаем класс на меню, когда кликнули по кнопке меню 
	  menu.classList.toggle('visible');
	});
	loginForm.addEventListener('submit', (event)=>{
		event.preventDefault();
		setUsers.logIn(emailInput.value , passwordInput.value,toggleAuthDom);
		event.target.reset();
	});

	loginSignup.addEventListener('click', event=>{
		event.preventDefault();
		if(emailInput.value.indexOf('.',emailInput.value.indexOf('@')+2) != -1){
			setUsers.signUp(emailInput.value , passwordInput.value,toggleAuthDom);
		} else alert('Введен некорректный email');
		loginForm.reset();
	});

	exitElem.addEventListener('click', event => {
		event.preventDefault();
		setUsers.logOut(toggleAuthDom);
	});

	editElem.addEventListener('click', event => {
		event.preventDefault();
		editContainer.classList.toggle('visible');
		editUsername.value = setUsers.user.displayName;

	});

	editContainer.addEventListener('submit', event => {
		event.preventDefault();
		setUsers.editUser(editUsername.value,editPhotoURL.value,toggleAuthDom)
		editContainer.classList.remove('visible');
		showAllPosts();
		editContainer.reset();
	});

	buttonNewPost.addEventListener('click', event => {
		event.preventDefault();
		showAddPosts()
	});

	addPostElem.addEventListener('submit', event => {
		event.preventDefault();
		const { title, text, tags } = addPostElem.elements;
		
		if (title.value.length < 6 ){
			alert('Слишком коротко для названия, милый');
			return;
		};

		if (text.value.length < 50 ){
			alert('Слишком коротко для текста, зая');
			return;
		};

		setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
		addPostElem.classList.remove('visible');
	});

	showAllPosts();
	toggleAuthDom();
};


document.addEventListener('DOMContentLoaded',init);

