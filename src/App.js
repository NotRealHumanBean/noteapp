import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child} from "firebase/database";

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

function writeUserData(obj) {
	set(ref(db), {
		obj
	})
}



const App = () => {
	/*
	const dbRef = ref(db);
	get(child(dbRef, `obj/`)).then((snapshot) => {
		//if (snapshot.exists()) {
		let Benotes = snapshot.val();
		console.log(Benotes);
		alert("STOP")
		//} 
	}).catch((error) => {
		console.error(error);
	});*/

	//console.log(Benotes);
	


	
	const [notes, setNotes] = useState([
		/*
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
		*/
	]);

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const dbRef = ref(db);
		get(child(dbRef, `obj/`)).then((snapshot) => {
			const savedNotes = snapshot.val();
			if (savedNotes) {
				setNotes(savedNotes);
			}
		})

	}, []);

	/*useEffect(() => {
		writeUserData(notes)
	}, [notes]);*/

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
		writeUserData(newNotes)
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		writeUserData(newNotes)
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

/*
get(child(dbRef, `obj/`)).then((snapshot) => {
			if (snapshot.exists()) {
				const savedNotes = snapshot.val();
			} else {
				alert("No data available");
			}
			}).catch((error) => {
			console.error(error);
			});
			if (savedNotes) {
				setNotes(savedNotes);
			}
*/