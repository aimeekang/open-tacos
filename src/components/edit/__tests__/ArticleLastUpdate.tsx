import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { EditMetadataType } from '../../../js/types'

jest.mock('../../../assets/icons/tree.svg', () => 'svg')
jest.mock('../../../js/usernameUtil', () => ({
  __esModule: 'true',
  getUserNickFromMediaDir: async () => await Promise.resolve('foos')
}))

describe('Article last update', () => {
  let ArticleLastUpdate
  beforeAll(async () => {
    // why async import?  see https://github.com/facebook/jest/issues/10025#issuecomment-716789840
    ArticleLastUpdate = await import('../ArticleLastUpdate').then(module => module.ArticleLastUpdate)
  })

  test('component handles null props', async () => {
    render(<ArticleLastUpdate />)
    const links = await screen.queryAllByRole('link')
    expect(links).toHaveLength(0)
  })

  test('component linking to editor profiles', async () => {
    const data: EditMetadataType = {
      createdAt: 1673595471992,
      createdBy: 'b9f8ab3b-e6e5-4467-9adb-65d91c7ebe7c',
      updatedAt: 1674761647299,
      updatedBy: 'b9f8ab3b-e6e5-4467-9adb-65d91c7ebe7c'
    }
    render(<ArticleLastUpdate {...data} />)
    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(2)
  })
})
