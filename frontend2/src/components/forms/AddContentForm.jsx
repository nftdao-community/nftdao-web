import React, { useState } from 'react'

const AddContentForm = props => {
	const initialFormState = { id: null, name: '', title: '', content:'' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value})
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.name || !user.title) return

				props.addContent(user)
				setUser(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Title</label>
			<input type="text" name="title" value={user.title} onChange={handleInputChange} />
			<label>Content</label>
			<textarea name="content" rows="20" cols="50" value={user.content} onChange={handleInputChange} />
			<button>Submit</button>
		</form>
	)
}

export default AddContentForm
