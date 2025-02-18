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
    public async Task AcceptCall(string callerId)
    {
        // Notify the caller that the call has been accepted
        await Clients.Client(callerId).SendAsync("callAccepted");
    }

    public async Task DenyCall(string callerId)
    {
        // Notify the caller that the call was denied
        await Clients.Client(callerId).SendAsync("callDenied");
    }
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

    public async Task StartCall(string ChatID, string targetConnectionId)
    {
        _callerConnectionId = Context.ConnectionId;
        _logger.LogInformation($"Call started by: {_callerConnectionId}");
        Console.WriteLine("ID of Chat:" + ChatID);
        await Clients.Group(ChatID).SendAsync("CallStartedBy", _callerConnectionId);
        await Clients.GroupExcept(ChatID,targetConnectionId).SendAsync("incomingCall", Context.ConnectionId);
    }

    public async Task CallEnded(string ChatID, string targetConnectionId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, ChatID);
        await Clients.GroupExcept(ChatID, targetConnectionId).SendAsync("CallEnd",Context.ConnectionId);
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
