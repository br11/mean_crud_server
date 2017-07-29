import { tpa, api } from '../../../foundation';

@tpa.Schema('user_profile', {
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    status: String
})
@api.Path('user_profile')
export class UserProfileModel {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    status: String
}

export function init() {
    console.log('Initiating model for UserProfileModel');
    new UserProfileModel();
}