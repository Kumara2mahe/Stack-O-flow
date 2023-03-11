import COLORS from "./colors.json"
import "./avatar.css"


const Avatar = ({ children, gradientBg, fontSize, fontWeight, color, padH, padV, borderRadius, cursor }) => {
    const styles = {
        fontWeight: fontWeight || 500,
        color: color || "white",
        borderRadius,
        cursor: cursor || "default",
    }
    if (fontSize) {
        styles.fontSize = fontSize
    }
    if (padV && padH) {
        styles.padding = `${padV} ${padH}`
    }
    return (
        <div className={gradientBg ? `avatar ${gradientBg}` : "avatar"} style={styles}>
            <p>{getFirstLetter(children)}</p>
        </div>
    )
}

const getFirstLetter = (word) => {
    return String(word).trim().charAt(0).toLocaleUpperCase()
}

export const getRandomAvatar = () => {
    return COLORS.names[Math.floor(Math.random() * COLORS.names.length)]
}

export default Avatar