/*
BOJ 9466 텀프로젝트

cycle 갯수 찾는 문제
dfs 탐색후 방문한적 없으면 count++

// TODO 
 visited ??  
 
*/

#include <stdio.h>
#include <vector>

#define MAX_NODES 100000

using namespace std;

vector<int> edges[MAX_NODES + 1];
bool isVisited[MAX_NODES + 1];
bool isFinished[MAX_NODES + 1];
int cnt;

void finishNext(int node) {
  isFinished[node] = true;
  for(int next: edges[node]) {
    if(!isFinished[next]) {
      finishNext(next);
      cnt++;
    }
  }
}
void dfs(int node) {
  isVisited[node] = true;
  for(int next: edges[node]) {
    if(isVisited[next]) {
      if(!isFinished[next]) {
        finishNext(next);
      }
    } else {
      dfs(next);
    }
  }
  isFinished[node] = true;
  cnt++;
}

int main() {
  int T, n, to, i;
  
  scanf("%d", &T);
  while(T--) {
    scanf("%d", &n);
    for(i = 1; i <= n; i++) {
      scanf("%d", &to);
      edges[i].push_back(to);
    }
    for(i = 1; i <= n; i++) {
      dfs(i);
    }
    printf("%d\n", cnt);

    cnt = 0;
    for(i = 1; i <= n; i++) {
      isVisited[i] = false;
      isFinished[i] = false;
      while(!edges[i].empty()) edges[i].pop_back();
    }
  }
  return 0;
} 