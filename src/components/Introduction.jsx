import React from 'react';
import profileData from '../data/profile.json';
import profileImg from '../assets/DK.jpg';
// TODO: Uncomment the line below after adding your photo to src/assets
// import profilePhoto from '../assets/profile.jpg'; 

const Introduction = () => {
    return (
        <section className="introduction">
            {/* If you have imported the photo, change src={profileData.photo} to src={profilePhoto} */}
            <img src={profileImg} alt={profileData.name} className="profile-photo" />
            <h1>{profileData.name}</h1>
            <p className="status">
                {profileData.status} at <a href={profileData.affiliationUrl} target="_blank" rel="noopener noreferrer" className="affiliation-link">{profileData.affiliation}</a>
            </p>
            <p className="bio">{profileData.bio}</p>
            <div className="interests">
                {profileData.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                ))}
            </div>
        </section>
    );
};

export default Introduction;
