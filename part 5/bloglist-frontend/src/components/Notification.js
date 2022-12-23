const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    const LowerCaseMessage = message.toLowerCase()
    const classChoice = LowerCaseMessage.includes('wrong') ? 'red' : 'green'
    return (
        <div className={classChoice}>
           {message}
        </div>
    )
}

export default Notification