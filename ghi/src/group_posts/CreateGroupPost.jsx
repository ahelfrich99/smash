import { useState } from 'react';

const CreateGroupPost = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('')
    const handleUserChange = (e) => {
        setUser(e.target.value);
    }
    const [bangerz, setBangerz] = useState([])
    const [banger, setBanger] = useState('')
    const handleBangerChange = (e) => {
        setBanger(e.target.value);
    }
    const [content, setContent] = useState('')
    const handleContentChange = (e) => {
        
    }

}
