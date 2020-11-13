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
const DEFAULT_PHOTO = userAvatarElem.src;
const loginForget = document.querySelector('.login-forget');

const setUsers = {
	user:null,
	initUser(handler){
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				this.user = user;
			} else {
				this.user = null;
			};
			if( handler ) handler();
		});
	},
	logIn(email,password, handler){
		
		firebase.auth().signInWithEmailAndPassword(email,password)
			.catch(err => {
				const errCode = err.code;
				const errMessage = err.message;
				if(errCode === 'auth/wrong-password' ){
					console.log(errMessage);
					alert('Неверный пароль')
				} else if(errCode === 'auth/user-not-found'){
					console.log(errMessage);
					alert('Пользователь не найден');
				} else {
					alert(errMessage)
				}

				console.log(errMessage);
			});

		/*const user = this.getUser(email);
		if(user.password == password){
			this.authorizedUser(user);
			handler();
		} else {
			alert("Пользователь с такими данными не найден")
		}*/
	},

	logOut(handler){
		
		firebase.auth().signOut();
	},

	signUp(email,password, handler){

		if(!email.trim() || !password.trim()){
			alert('Введите данные');
			return;
		};

		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(date => {
				this.editUser(email.substring(0,email.indexOf('@')), null, handler)
			})
			.catch(err => {
				const errCode = err.code;
				const errMessage = err.message;
				if(errCode === 'auth/weak-password' ){
					console.log(errMessage);
					alert('Слабый пароль')
				} else if(errCode === 'auth/email-alresdy-in-use'){
					console.log(errMessage);
					alert('Пользователь с таким email уже есть')
				} else {
					alert(errMessage)
				}

				console.log(errMessage);
			});

		/*if(!this.getUser(email) ){
			const displayName = email.split('@')[0];
			const user = {email,password,displayName:email.substring(0,email.indexOf('@')),photo: 'img/avatar.jpeg'}
			listUsers.push(user);
			this.authorizedUser(user);
			handler();
		} else {
			alert('Пользователь с таким email уже зарегистрирован');
		}*/
	},

	getUser(email){
		return listUsers.find(item=>item.email === email);
	},

	authorizedUser(user){
		this.user = user;
	},

	editUser(displayName,photoURL = '', handler){

		const user = firebase.auth().currentUser;

		let prevName = user.displayName;
		console.log(prevName);
		
		const userUpdate = {
			displayName
		}

		if (displayName){
			if(photoURL){
				user.updateProfile({
					displayName,
					photoURL
				}).then(handler)
			} else {
				user.updateProfile({
					displayName
				}).then(handler)
			}		
		}

	},

	sendForget(email){
		firebase.auth().sendPasswordResetEmail(email)
			.then(()=>{
				alert('Письмо отправлено');
			})
			.catch(err => {
				console.log(err);
			})
	}

};

const setPosts = {

	allPosts: [
	/*
		{
			title: 'Заголовок  поста',
			text: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот
	            маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему
	            букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его
	            снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую
	            подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что
	            вопроса ведущими о решила одна алфавит! `,
	        tags: ['свежее','новое','горячее','мое','случайность'],
	        author: {displayName:'Irinka',photoURL:'https://www.rosphoto.com/images/u/articles/1510/7_5.jpg'},
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
	        author:  {displayName:'Irinka',photoURL:'img/avatar.jpeg'},
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
	        author:  {displayName:'Irinka',photoURL:'https://www.rosphoto.com/images/u/articles/1510/7_5.jpg'},
	        date:'11.11.2020, 20:53:00',
	        like: 102,
	        comments:50,
		},
	*/
	],

	addPost(title, text, tags, handler){
		this.allPosts.unshift({id : `postID${(+new Date()).toString(16)}`,
							   title,
							   text,
							   tags: tags.split(',').map(item => item.trim()), 
							   author:{
							    	displayName:setUsers.user.displayName,
							    	photoURL:setUsers.user.photoURL
							   }, 
							   date: new Date().toLocaleDateString(), 
							   like:0, 
							   comments:0
		});

		firebase.database().ref('post').set(this.allPosts)
			.then(() => this.getPosts(handler))

		/*if(handler){
			handler();
		};*/

	},

	getPosts(handler){
		firebase.database().ref('post').on('value', snapshot => {
			this.allPosts = snapshot.val() || [];
			if(handler) handler();
		})
	}
};

const toggleAuthDom = () => {
	const user = setUsers.user;
	console.log(user);
	console.log(user)
	if(user){
		loginElem.style.display = 'none';
		userElem.style.display = 'flex';
		userNameElem.textContent = user.displayName;
		userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
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
	            <a href="#" class="author-link"><img src=${post.author.photoURL || 'img/avatar.jpeg'} alt="avatar" class="author-avatar"></a>
	            
	          </div>
	          <!-- /.post-author -->
	        </div>
        	<!-- /.post-footer -->
      	</section>
		`;
	})

	postsWrapper.innerHTML = postsHTML || '<p class="firstText">Будь первым! Добавь свой пост!</p>';

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
		setUsers.logOut();
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

	loginForget.addEventListener('click', event =>{
		event.preventDefault();
		setUsers.sendForget(emailInput.value);
		emailInput.value = '';
	})

	setUsers.initUser(toggleAuthDom);
	setPosts.getPosts(showAllPosts);
};


document.addEventListener('DOMContentLoaded',init);

