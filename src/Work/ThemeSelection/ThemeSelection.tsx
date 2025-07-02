import './ThemeSeletion.css'

const ThemeSelection = () => {
    return (
        <div className="scl--setting-theme-selection">
            <div className="scl--setting-theme-selection-container">
                <h4 className="scl--setting-theme-selection__header">
                    Theme
                </h4>
                <div className="scl--setting-theme-selection__body">
                    <div className="scl--setting-theme-selection__light">
                        <div className="scl--setting-theme-selection__light-wireframe">
                            <svg width="132" height="80" viewBox="0 0 132 80" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="131.314" height="79.4896" rx="2" fill="white"/>
                                <rect x="1.94922" y="5.0625" width="9.74138" height="9.74138" rx="2" fill="#1E50FF"/>
                                <path
                                    d="M116.898 7.84375C116.898 6.73918 117.794 5.84375 118.898 5.84375H124.64C125.744 5.84375 126.64 6.73918 126.64 7.84375V13.5851C126.64 14.6897 125.744 15.5851 124.64 15.5851H118.898C117.794 15.5851 116.898 14.6897 116.898 13.5851V7.84375Z"
                                    fill="#1E50FF"/>
                                <rect x="14.0273" y="5.45312" width="25.3276" height="9.74138" rx="2" fill="#EFEFEF"/>
                                <rect x="1.94922" y="18.3125" width="37.4069" height="9.74138" rx="2" fill="#EFEFEF"/>
                                <rect x="1.94922" y="31.5625" width="37.4069" height="9.74138" rx="2" fill="#EFEFEF"/>
                                <rect x="1.94922" y="64.6836" width="37.4069" height="9.74138" rx="2" fill="#EFEFEF"/>
                                <rect x="42.4727" y="5.45312" width="65.462" height="9.74138" rx="2" fill="#EFEFEF"/>
                                <rect x="42.9727" y="19.2031" width="83.1655" height="55.8896" rx="1.5" fill="#EFEFEF"
                                      stroke="#B3B3B3"/>
                            </svg>
                        </div>
                        <div className="scl--setting-theme-selection__light-wireframe-choose">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6.62414" cy="6.62414" r="6.62414" fill="#989898" fill-opacity="0.6"/>
                                <circle cx="6.6241" cy="6.62605" r="4.28621" fill="white"/>
                            </svg>
                            <span>Light Mode</span>
                        </div>
                    </div>
                    <div className="scl--setting-theme-selection__dark">
                        <div className="scl--setting-theme-selection__dark-wireframe">
                            <svg width="135" height="82" viewBox="0 0 135 82" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="135" height="82" rx="2" fill="#323232"/>
                                <rect x="2" y="5" width="10" height="10" rx="2" fill="#1E50FF"/>
                                <path
                                    d="M121 8C121 6.89543 121.895 6 123 6H129C130.105 6 131 6.89543 131 8V14C131 15.1046 130.105 16 129 16H123C121.895 16 121 15.1046 121 14V8Z"
                                    fill="#1E50FF"/>
                                <rect x="14" y="6" width="27" height="10" rx="2" fill="#B3B3B3"/>
                                <rect x="2" y="19" width="39" height="10" rx="2" fill="#B3B3B3"/>
                                <rect x="2" y="33" width="39" height="9" rx="2" fill="#B3B3B3"/>
                                <rect x="2" y="67" width="39" height="10" rx="2" fill="#B3B3B3"/>
                                <rect x="44" y="6" width="68" height="10" rx="2" fill="#B3B3B3"/>
                                <rect x="44.5" y="19.5" width="86" height="58" rx="1.5" fill="#B3B3B3"
                                      stroke="#B3B3B3"/>
                            </svg>
                        </div>
                        <div className="scl--setting-theme-selection__dark-wireframe-choose">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6.62414" cy="6.62414" r="6.62414" fill="#989898" fill-opacity="0.6"/>
                                <circle cx="6.6241" cy="6.62605" r="4.28621" fill="white"/>
                            </svg>
                            <span>Light Mode</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeSelection