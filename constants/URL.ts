export const getLoginParams = (code:string): Record<string, string> => ({
  client_id: '140827',
  client_secret: '0938d5a27bdbd5d808b8ead97a4265fa011d3d65',
  code: code,
  grant_type: 'authorization_code'
})

export const getRefreshParams = (refreshToken:string): Record<string, string> => ({
  client_id: '140827',
  client_secret: '0938d5a27bdbd5d808b8ead97a4265fa011d3d65',
  refresh_token: refreshToken,
  grant_type: "refresh_token"
})
