import React, { useState } from 'react';
import { View } from 'react-native';
import EnglishScreen from '../../components/parent_consent_english';
import TamilScreen from '../../components/parent_consent_tamil';

const DA_ParentConsentScreen = ({ navigation, route }) => {
    const { language } = route.params;
    const [consent, setConsent] = useState(false);

    const handleNext = () => {
        navigation.navigate('DA_ListenAndChooseDescriptionScreen', { language });
    };

    const toggleConsent = () => {
        setConsent(!consent);
    };

    return (
        <View style={{ flex: 1 }}>
            {language === 'ENGLISH' ? (
                <EnglishScreen toggleConsent={toggleConsent} consent={consent} handleNext={handleNext} />
            ) : (
                <TamilScreen toggleConsent={toggleConsent} consent={consent} handleNext={handleNext} />
            )}
        </View>
    );
};

export default DA_ParentConsentScreen;
