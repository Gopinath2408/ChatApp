import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase";

export const Chat = (props) => {
    const { room } = props;

    const [NewMessage, setNewMessage] = useState("");
    const messageRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query(
            messageRef,
            where("room", "==", room),
            orderBy("createdAt") // Ensure messages are ordered by creation time
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages); // Update messages in real-time
        });

        return () => unsubscribe();
    }, [room]); // Listen for changes in the room

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (NewMessage === "") return;

        await addDoc(messageRef, {
            text: NewMessage,
            createdAt: serverTimestamp(), // Set createdAt timestamp
            user: auth.currentUser ? auth.currentUser.displayName : 'Anonymous', // Fallback to 'Anonymous'
            room,
        });

        setNewMessage(""); // Clear input after sending
    };

    const handleSignOut = async () => {
        await auth.signOut(); // Sign out the user
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
                
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div className={`message ${message.user === (auth.currentUser ? auth.currentUser.displayName : 'Anonymous') ? 'sent' : 'received'}`} key={message.id}>
                        <span className="user">{message.user}</span>
                        <span className="text">{message.text}</span>
                    </div>
                ))}
            </div>

            <form className="new-message-form" onSubmit={handleSubmit}>
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={NewMessage}
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};
