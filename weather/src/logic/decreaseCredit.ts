export default function decreaseCredit() {
    localStorage.credits = localStorage.credits - 1

    return localStorage.credits
}