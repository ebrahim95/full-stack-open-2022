const Notification = ({message}) => {
    if (message === null) return null 
    const errOrSucc = message.toLowerCase().includes("removed") ? "error" : "success"
    return (
      <div className={errOrSucc}>
        {message}
      </div>
    )
  } 