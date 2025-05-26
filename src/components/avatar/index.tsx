import React from "react";

interface IAvatar{
    imgSrc: string
    alt?: string
}

const Avatar = (props: any) =>{
    const { imgSrc, alt } : IAvatar = props;
    const avatarStyles = {borderRadius: '100%', backgroundColor: "#ececec", border: '1px solid #E2E8F0'}
    const defaultAvatarSrc = "images/default-avatar.jpeg"
    return(
        <img style={avatarStyles} width={32} height={32} src={ imgSrc || defaultAvatarSrc} alt={alt || ""} />
    );
}

export default Avatar;