import { Trans, t } from '@lingui/macro';
import { Button, Segmented, Tooltip } from 'antd';
import { useState } from 'react';

import { AppFooter } from 'src/components/BaseLayout/Footer';
import logo from 'src/images/logo.svg';
import { getAuthorizeUrl, OAuthState } from 'src/services/auth';

import { useAppleAuthentication } from './hooks';
import s from './SignIn.module.scss';
import { S } from './SignIn.styles';

enum SignInService {
    EMR = 'EMR',
    PatientPortal = 'Patient Portal',
}

function authorize(state?: OAuthState) {
    window.location.href = getAuthorizeUrl(state);
}

interface SignInProps {
    originPathName?: string;
}

export function SignIn(props: SignInProps) {
    const [signInService, setSignInService] = useState<string>(SignInService.EMR);

    return (
        <S.Container>
            <S.Form>
                <div className={s.header}>
                    <S.Text>{t`Welcome to`}</S.Text>
                    <img src={logo} alt="" />
                </div>
                <Segmented
                    value={signInService}
                    options={[SignInService.EMR, SignInService.PatientPortal]}
                    block
                    onChange={(value) => setSignInService(value as SignInService)}
                    className={s.signInServiceSelectLabel}
                />
                {signInService === SignInService.EMR ? (
                    <>
                        <S.Message>
                            <b>{t`On the next page, please, use one of the following credentials`}</b>
                            <S.CredentialsWrapper>
                                <S.CredentialsBlock>
                                    <S.CredentialLabel>
                                        <Trans>Username</Trans>
                                    </S.CredentialLabel>
                                    <S.CredentialsList>
                                        <div>
                                            <Tooltip title="As an admin, you have full access to settings and data">
                                                <S.CredentialName>admin</S.CredentialName>
                                            </Tooltip>
                                        </div>
                                        <span>/</span>
                                        <div>
                                            <Tooltip title="As a receptionist, you have access to appointments and invoices management">
                                                <S.CredentialName>receptionist</S.CredentialName>
                                            </Tooltip>
                                        </div>
                                        <span>/</span>
                                        <div>
                                            <Tooltip title="Practitioner #1 does not have access to Practitioner #2's patients">
                                                <S.CredentialName>practitioner1</S.CredentialName>
                                            </Tooltip>
                                        </div>
                                        <span>/</span>
                                        <div>
                                            <Tooltip title="Practitioner #2 does not have access to Practitioner #1's patients">
                                                <S.CredentialName>practitioner2</S.CredentialName>
                                            </Tooltip>
                                        </div>
                                    </S.CredentialsList>
                                </S.CredentialsBlock>
                                <S.CredentialsBlock>
                                    <S.CredentialLabel>
                                        <Trans>Password</Trans>
                                    </S.CredentialLabel>
                                    <S.CredentialsList>
                                        <span>password</span>
                                    </S.CredentialsList>
                                </S.CredentialsBlock>
                            </S.CredentialsWrapper>
                        </S.Message>
                        <Button
                            type="primary"
                            onClick={() => authorize({ nextUrl: props.originPathName })}
                            size="large"
                        >
                            {t`Log in`}
                        </Button>
                    </>
                ) : (
                    <>
                        <S.Message>
                            <b>{t`On the next page, please, use one of the following credentials`}</b>
                            <S.CredentialsWrapper>
                                <S.CredentialsBlock>
                                    <S.CredentialLabel>
                                        <Trans>Username</Trans>
                                    </S.CredentialLabel>
                                    <S.CredentialsList>
                                        <div>
                                            <Tooltip title="As a patient, you have access to your health data and invoices">
                                                <S.CredentialName>patient1</S.CredentialName>
                                            </Tooltip>
                                        </div>
                                        <span>/</span>
                                        <div>
                                            <Tooltip title="As a patient, you have access to your health data and invoices">
                                                <S.CredentialName>patient2</S.CredentialName>
                                            </Tooltip>
                                        </div>
                                    </S.CredentialsList>
                                </S.CredentialsBlock>
                                <S.CredentialsBlock>
                                    <S.CredentialLabel>
                                        <Trans>Password</Trans>
                                    </S.CredentialLabel>
                                    <S.CredentialsList>
                                        <span>password</span>
                                    </S.CredentialsList>
                                </S.CredentialsBlock>
                            </S.CredentialsWrapper>
                        </S.Message>
                        <S.ButtonsWrapper>
                            <Button
                                type="primary"
                                onClick={() => authorize({ nextUrl: props.originPathName })}
                                size="large"
                            >
                                {t`Log in as demo patient`}
                            </Button>
                            <AppleButton />
                        </S.ButtonsWrapper>
                    </>
                )}
            </S.Form>
            <AppFooter type="light" />
        </S.Container>
    );
}

function AppleButton() {
    useAppleAuthentication();

    return (
        <div
            className={s.appleSignInBtn}
            id="appleid-signin"
            data-color="black"
            data-border="true"
            data-type="sign-in"
        />
    );
}
