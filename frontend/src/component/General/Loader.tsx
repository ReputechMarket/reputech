import logo from '../../assets/logo.png'

export const Loader = () => {
    return (
      <div className="w-full min-h-[200px] h-full flex justify-center items-center">
        <span className="loader"><img src={logo} alt="deal fortress logo" className="logo-s "/></span>
      </div>
    )
  }
