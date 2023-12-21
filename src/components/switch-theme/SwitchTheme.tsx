import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import '../../sass/switch/switch.scss';
import { FC } from "react";

interface SwitchThemeProps {
    setChangeTheme: React.Dispatch<React.SetStateAction<boolean>>;
    changeTheme: boolean;
}

const SwitchTheme: FC<SwitchThemeProps> = ({ setChangeTheme, changeTheme }) => {
    return (
        <label className="switch">  
            <MdOutlineWbSunny className="switch_sun"/>
            <FaRegMoon className="switch_moon"/>
            <input 
                type="checkbox" 
                onClick={() => setChangeTheme(!changeTheme)}/>
            <span className="move"></span>
        </label>
    )
}

export { SwitchTheme }