#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define vpll vector<pair<ll,ll>>
#define pll pair<ll, ll>
#define vll vector<ll>
#define rep(i,a,b) for(ll i=a;i<b;i++)
#define per(i,a,b) for(int i=b-1;i>=a;i--)
#define fi first
#define se second
#define pb push_back
#define sortv(v) sort(v.begin(),v.end())
// Fast I/O
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL)
inline ll gcd(ll a, ll b) {return(b==0)?a:gcd(b,a%b);}
inline ll lcm(ll a,ll b){return(a/gcd(a,b))*b;}

void solve(int case_num) {
    ll n;
    cin >> n;
    if (n == 0) {
        cout << "Case #" << case_num << ": 0\n";
        return;
    }
    vll a(n);
    rep(i, 0, n) {
        cin >> a[i];
    }
    vll l(n);
    l[0] = a[0];
    rep(i, 1, n) {
        l[i] = min(a[i], max(abs(a[i] - a[i - 1]), l[i - 1]));
    }
    vll r(n);
    r[n - 1] = a[n - 1];
    per(i, 0, n - 1) {
        r[i] = min(a[i], max(abs(a[i] - a[i + 1]), r[i + 1]));
    }
    ll max_h = 0;
    rep(i, 0, n) {
        ll min_h_for_i = min(l[i], r[i]);
        if (min_h_for_i > max_h) {
            max_h = min_h_for_i;
        }
    }
    cout << "Case #" << case_num << ": " << max_h << "\n";
}

int main() {
    fastio();
    ll t;
    cin >> t;
    rep(i, 1, t + 1) {
        solve(i);
    }
    return 0;
}