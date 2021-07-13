export const config = {
    okta: {
        oidc: {
            clientId: '0oasklaniP9MeU9fs0x6',
            issuer: 'https://preview.finalcad.com/oauth2/ausv056t9AKHmSUvk0x6',
            scopes: ['openid', 'profile', 'email'],
        },
        domain: 'https://finalcad.oktapreview.com',
        idps: [
            { type: 'GOOGLE', id: '0oauz0nrt59Fr4uDU0x6' },
            { type: 'MICROSOFT', id: '0oauz0gl9OiziRx2C0x6' },
            { type: 'APPLE', id: '0oauk3dptMonqrNiT0x6' },
        ],
    },
}
