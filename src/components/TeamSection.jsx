import React from 'react';
import TeamCard from './TeamCard';
import { excomData, headsData } from '../data/teamData';
import './TeamSection.css';

const TeamSection = () => {
    return (
        <section className="team-section">
            <div className="container">
                <header className="section-header">
                    <h1 className="main-title">Our Team</h1>
                    <div className="title-underline"></div>
                    <h2 className="sub-title">IEEE Student Branch Executive Committee & Heads</h2>
                </header>

                <div className="committee-group">
                    <h3 className="group-title">Executive Committee</h3>
                    <div className="team-grid excom-grid">
                        {excomData.map((member, index) => (
                            <TeamCard
                                key={index}
                                name={member.name}
                                position={member.position}
                                image={member.image}
                                linkedin={member.linkedin}
                                github={member.github}
                            />
                        ))}
                    </div>
                </div>

                <div className="committee-group">
                    <h3 className="group-title">Heads & Co-Heads</h3>
                    <div className="team-grid heads-grid">
                        {headsData.map((member, index) => (
                            <TeamCard
                                key={index}
                                name={member.name}
                                position={member.position}
                                image={member.image}
                                linkedin={member.linkedin}
                                github={member.github}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
