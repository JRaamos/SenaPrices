import React from "react";  

import moment from 'moment';
import 'moment/locale/pt-br';

import {  
    DashboardText,
    DarboardUserImage,
    DarboardUserImageAction,
    DarboardUserImageActionIcon,
} from "./styled";

import UploadFile from "components/Form/UploadFile";

import { Load } from "ui/styled";
import useController from "./controller";

export default function DashboardUserCard(){  
    
    const {
        preview,
        setPreview,
        takePic,
        fetching,
        user,
    } = useController()

    return ( 
        <>
            <DarboardUserImage image={preview ? preview : '/images/no-user.png'}>
                <UploadFile onChange={takePic} onPreview={setPreview}>
                    { fetching ? <Load /> : null }
                    <DarboardUserImageAction>
                        <DarboardUserImageActionIcon />
                    </DarboardUserImageAction>
                </UploadFile>
            </DarboardUserImage>
            <DashboardText centred>
                Usuário desde { moment(user.created_at).format('L') }
            </DashboardText> 
        </>
    );
}