import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, update, remove } from "firebase/database";
import { hydrate } from 'react-dom';

const firebaseConfig = {
	apiKey: "AIzaSyBEqXM7JTOIXqsgLJGKaZwublShLW22UwM",
	authDomain: "noteapp-81e8d.firebaseapp.com",
	databaseURL: "https://noteapp-81e8d-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "noteapp-81e8d",
	storageBucket: "noteapp-81e8d.appspot.com",
	messagingSenderId: "811981660675",
	appId: "1:811981660675:web:7f7243ac218255a05f2436"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const letmeknow = {
	id: "let",
	text: "me",
	data: "know"
}
function writeUserData(obj) {
	set(ref(db), {
		obj
		//id: id,
		//text: text,
		//data: data
	})
	.then(()=>{
	  alert("I was here");
	  console.log("HELLO THERE")
	})
	.catch((error)=> {
	  alert("unsuccessful error" + error)
	});
}
function hey() {
	console.log("HEY HEY HEY");
}
//writeUserData(notes.id, notes.text, notes.date)
//writeUserData(nanoid(),'This is my first note!','15/04/2021')

const App = () => {
	hey();
	//writeUserData(savedNotes)
//////////////////////////////////////////////////////////////////////////////
	/*
	const writeUserData = (id, text, data) => {
		set(ref(db, 'notes/'), {
			id: id,
			text: text,
			data: data
		})
		.then(()=>{
		alert("I was here");
		console.log("HELLO THERE")
		})
		.catch((error)=> {
		alert("unsuccessful error" + error)
		});
	};*/


	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	]);
//////////////////////////////////////////////////////////////////////////////
	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);
//////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		writeUserData(notes)
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);
////////////////////////////////////////////////////////////////////////////////////////
	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
		//writeUserData(22, "Three Kingdoms", "Today")
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};
export default App;
