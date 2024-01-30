import { test, expect } from '@playwright/test'

const delay = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms)
    })

test('첫 화면 로딩', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    const loginText = page.getByText('아이디를 입력하십시오', { exact: true })

    // 로그인이 되어 있지 않을시 첫 화면에 있는지 확인한다.
    await expect(loginText).toBeVisible()
})

test('로그인 실패', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // 올바르지 않은 ID를 입력한다.
    await page.getByRole('textbox').fill('not')

    await page.getByRole('button').click()

    // 로그인이 되어 있지 않을시 첫 화면에 있는지 확인한다.
    await expect(
        page.getByText('아이디를 입력하십시오', { exact: true }),
    ).toBeVisible()
})

test('로그인 성공', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // 올바른 ID를 입력한다.
    await page.getByRole('textbox').fill('test')

    await page.getByRole('button').click()

    await delay(1000)

    // 로그인이 되어 다음 화면으로 넘어갔는지 체크한다.
    await expect(
        page.getByText('아이디를 입력하십시오', { exact: true }),
    ).toBeHidden()
})

test('로그아웃', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // 올바른 ID를 입력한다.
    await page.getByRole('textbox').fill('test')

    await page.getByRole('button').click()

    await delay(1000)

    // 로그아웃 한다.
    await page.getByRole('button').getByText('로그아웃').click()

    await delay(1000)

    // 정상적으로 로그아웃 되었는지 확인한다.
    await expect(
        page.getByText('아이디를 입력하십시오', { exact: true }),
    ).toBeVisible()
})

test('관리페이지 진입 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // 올바른 ID를 입력한다.
    await page.getByRole('textbox').fill('test')

    await page.getByRole('button').click()

    await delay(1000)

    // 관리페이지가 잘 로딩 되었는지 확인한다.
    await expect(
        page.getByText('운영중인 농장을 선택해주세요', { exact: true }),
    ).toBeVisible()
})

test('존재하지 않는 농장 진입 불가능 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // 올바른 ID를 입력한다.
    await page.getByRole('textbox').fill('test')

    await page.getByRole('button').click()

    await delay(1000)

    // 존재하지 않는 농장의 정보를 보려고 할때
    await page.goto('http://localhost:3000/farm/30')

    await delay(2000)

    // 관리페이지로 다시 리다이렉트 되었는지 확인한다.
    await expect(
        page.getByText(
            '해당 농장은 본인의 소유가 아니거나 존재 하지 않습니다.',
            { exact: true },
        ),
    ).toBeVisible()
})

test('자신의 것이 아닌 농장 진입 불가능 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // 올바른 ID를 입력한다.
    await page.getByRole('textbox').fill('test')

    await page.getByRole('button').click()

    await delay(1000)

    // 자신의 것이 아닌 농장의 정보를 보려고 할때
    await page.goto('http://localhost:3000/farm/3')

    await delay(2000)

    // 관리페이지로 다시 리다이렉트 되었는지 확인한다.
    await expect(
        page.getByText(
            '해당 농장은 본인의 소유가 아니거나 존재 하지 않습니다.',
            { exact: true },
        ),
    ).toBeVisible()
})
