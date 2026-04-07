import React from "react";   

import DecryptedText from "components/Bits/DecryptedText";
import LetterGlitch from "components/Bits/LetterGlitch";
import SplashCursor from "components/Bits/SplashCursor";
import ElectricBorder from "components/Bits/ElectricBorder";
import ProfileCard from "components/Bits/ProfileCard";
import BubbleMenu from "components/Bits/BubbleMenu";

export default function ReactBits(){   

    const items = [
        {
            label: 'home',
            href: '#',
            ariaLabel: 'Home',
            rotation: -8,
            hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
        },
        {
            label: 'about',
            href: '#',
            ariaLabel: 'About',
            rotation: 8,
            hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
        },
        {
            label: 'projects',
            href: '#',
            ariaLabel: 'Projects',
            rotation: 8,
            hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
        },
        {
            label: 'blog',
            href: '#',
            ariaLabel: 'Blog',
            rotation: 8,
            hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
        },
        {
            label: 'contact',
            href: '#',
            ariaLabel: 'Contact',
            rotation: -8,
            hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
        }
    ];

    return ( 
        <> 
            {/* <SplashCursor /> */}

            {/* <DecryptedText
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut congue nisl. Duis lobortis ante vitae hendrerit efficitur. Quisque dolor magna, efficitur et nunc id, pretium porta mauris. Integer vel lobortis risus. Duis consectetur ac ante at ullamcorper. Nullam luctus sollicitudin odio, eu gravida lorem efficitur ac. Nam pulvinar consequat cursus. Maecenas convallis sagittis erat, at tristique lectus pharetra et. In eget metus nisl. Maecenas orci ipsum, sagittis non erat eleifend, dignissim suscipit mi. Ut a tellus quis enim pellentesque fringilla. Sed in malesuada felis, eget volutpat neque."
                animateOn="view"
                revealDirection="center"
                speed={200}
            /> */}

            {/* <LetterGlitch
                glitchSpeed={50}
                centerVignette={true}
                outerVignette={false}
                smooth={true}
            /> */} 

            {/* <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
                >
                <div>
                    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
                    A glowing, animated border wrapper.
                    </p>
                </div>
            </ElectricBorder> */}

            {/* <ProfileCard
                name="Javi A. Torres"
                title="Software Engineer"
                handle="javicodes"
                status="Online"
                contactText="Contact Me"
                iconUrl="/images/no-user.png"
                grainUrl="/images/no-user.png"
                avatarUrl="/images/no-user.png"
                miniAvatarUrl="/images/no-user.png"
                showUserInfo={true}
                showIconPattern={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
            /> */}

            {/* <BubbleMenu
                logo={<span style={{ fontWeight: 700 }}>RB</span>}
                items={items}
                menuAriaLabel="Toggle navigation"
                menuBg="#ffffff"
                menuContentColor="#111111"
                useFixedPosition={false}
                animationEase="back.out(1.5)"
                animationDuration={0.5}
                staggerDelay={0.12}
            /> */}
        </>
    );
}