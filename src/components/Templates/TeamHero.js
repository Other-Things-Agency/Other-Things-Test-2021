import React from "react";
import PropTypes from "prop-types";
import Image from "../Global/Image";

const TeamHero = (props) => {
    const { name, background, hero, teamLogo, joinTeam } = props;
    const handleClick = (e) => joinTeam()

  return (
    <div className={`col-6 box box-${name}`}>
        <div className="box-base abs-full">
            <Image src={background} sm='960x540' md='1080x1080' lg='1080x1080' alt={background.alt} className="img-bg-cover" />
            <div className="bg-col opacity-30 mix-multiply bg-grey-50 abs-full"></div>
        </div>
        <div className="box-content text-center-">    
            <Image src={teamLogo.filename} sm='320x320' md='720x720' lg='1080x1080' alt={teamLogo.alt} className="team-logo" />
            <Image src={hero.filename} sm='480x270' md='960x540' lg='1280x720' alt={hero.alt} className="team-hero" />
        <div className="btn-arrows btnwrap"><div className="btn-l bg-orange-60"></div>
            <div className="btn-m bg-orange-60">
            <div onClick={handleClick} className="btn--link"><div className="btn--content">Join Team</div></div>
            </div><div className="btn-r bg-orange-60"></div>
        </div>
        </div>
    </div>
  );
};

export default TeamHero;

TeamHero.propTypes = {
    name: PropTypes.string,
    background: PropTypes.string,
    hero: PropTypes.string,
    teamLogo: PropTypes.string,
    joinTeam: PropTypes.func,
};

TeamHero.defaultProps = {
    name: null,


};


