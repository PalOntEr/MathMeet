using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

public class VideoChatHub : Hub
{
    private readonly ILogger<VideoChatHub> _logger;

    public VideoChatHub(ILogger<VideoChatHub> logger)
    {
        _logger = logger;
    }

    private static string _callerConnectionId;

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync("UserJoined", Context.ConnectionId);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync("UserLeft", Context.ConnectionId);
    }

    public async Task StartCall(string ChatID)
    {
        _callerConnectionId = Context.ConnectionId;
        _logger.LogInformation($"Call started by: {_callerConnectionId}");
        Console.WriteLine("ID of Chat:" + ChatID);
        await Clients.Group(ChatID).SendAsync("CallStartedBy", _callerConnectionId);
    }

    public async Task SendOffer(string offer, string targetConnectionId,string ChatID)
    {
        _logger.LogInformation("Sending offer to a specific client.");
        var ConnectionId = Context.ConnectionId;
        await Clients.GroupExcept(ChatID,ConnectionId).SendAsync("ReceiveOffer", offer, ConnectionId);
    }

    public async Task SendAnswer(string answer, string targetConnectionId, string ChatID)
    {
        var ConnectionId = Context.ConnectionId;
        _logger.LogInformation("Sending answer to a specific client.");
        await Clients.GroupExcept(ChatID, ConnectionId).SendAsync("ReceiveAnswer", answer,ConnectionId);
    }

    public async Task SendIceCandidate(string candidate, string targetConnectionId, string ChatID)
    {
        _logger.LogInformation("Sending ICE candidate to a specific client.");
        await Clients.Group(ChatID).SendAsync("ReceiveIceCandidate", candidate);
    }
}
