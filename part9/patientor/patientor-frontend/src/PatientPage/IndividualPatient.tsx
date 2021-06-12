import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';

import { Icon, SemanticICONS } from "semantic-ui-react";


const IndividualPatient = () => {

    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>();

    useEffect(() => {
        const getPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patient);
                dispatch(updatePatient(patient));
            } catch (error) {
                console.log(error);
            }
        };

        if (patients[id] && patients[id].ssn) {
            setPatient(patients[id]);
        } else {
            void getPatient();
        }
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    const genderIcon = (gender: Gender): SemanticICONS => {
        switch (gender) {
            case "male":
                return "mars";
            case "female":
                return "venus";
            default:
                return "transgender alternate";
        }
    };

    return (
        <div>
            {patient && (
                <>
                    <h1>
                        {patient.name}
                        <Icon name={genderIcon(patient.gender)} />
                    </h1>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </>    
            )}
        </div>
    );
};

export default IndividualPatient;
